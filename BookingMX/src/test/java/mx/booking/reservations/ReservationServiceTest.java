package mx.booking.reservations;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Replace the interfaces/classes with your actual names.
 * This shows how to test create/edit/cancel with Mockito.
 */
@ExtendWith(MockitoExtension.class)
class ReservationServiceTest {

    @Mock ReservationRepository repository;
    @Mock AvailabilityService availability;

    @InjectMocks ReservationService service;

    private Reservation sample;

    @BeforeEach
    void setUp() {
        sample = new Reservation(
                "r-123",
                "hotel-1",
                "room-12",
                LocalDate.now().plusDays(3),
                LocalDate.now().plusDays(7),
                2,
                ReservationStatus.CONFIRMED
        );
    }

    @Test
    @DisplayName("Create reservation – happy path")
    void create_ok() {
        when(availability.hasConflict("room-12", sample.getCheckIn(), sample.getCheckOut())).thenReturn(false);
        when(repository.save(any())).thenAnswer(inv -> inv.getArgument(0));

        Reservation created = service.create(sample);

        assertThat(created.getStatus()).isEqualTo(ReservationStatus.CONFIRMED);
        verify(repository).save(any());
        verify(availability).hasConflict("room-12", sample.getCheckIn(), sample.getCheckOut());
    }

    @Test
    @DisplayName("Create reservation – reject overlapping dates")
    void create_conflict() {
        when(availability.hasConflict("room-12", sample.getCheckIn(), sample.getCheckOut())).thenReturn(true);

        assertThatThrownBy(() -> service.create(sample))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("overlap");

        verify(repository, never()).save(any());
    }

    @Test
    @DisplayName("Edit reservation – change dates when no conflict")
    void edit_ok() {
        when(repository.findById("r-123")).thenReturn(Optional.of(sample));
        LocalDate newIn = sample.getCheckIn().plusDays(1);
        LocalDate newOut = sample.getCheckOut().plusDays(1);
        when(availability.hasConflict("room-12", newIn, newOut)).thenReturn(false);

        Reservation edited = service.editDates("r-123", newIn, newOut);

        assertThat(edited.getCheckIn()).isEqualTo(newIn);
        assertThat(edited.getCheckOut()).isEqualTo(newOut);
        verify(repository).save(edited);
    }

    @Test
    @DisplayName("Edit reservation – fail when id not found")
    void edit_notFound() {
        when(repository.findById("missing")).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.editDates("missing", LocalDate.now(), LocalDate.now().plusDays(1)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("not found");
    }

    @Test
    @DisplayName("Cancel reservation – transitions to CANCELED")
    void cancel_ok() {
        when(repository.findById("r-123")).thenReturn(Optional.of(sample));
        Reservation canceled = service.cancel("r-123");

        assertThat(canceled.getStatus()).isEqualTo(ReservationStatus.CANCELED);
        verify(repository).save(canceled);
    }

    @Test
    @DisplayName("Cancel reservation – already canceled")
    void cancel_alreadyCanceled() {
        sample.setStatus(ReservationStatus.CANCELED);
        when(repository.findById("r-123")).thenReturn(Optional.of(sample));

        assertThatThrownBy(() -> service.cancel("r-123"))
                .isInstanceOf(IllegalStateException.class)
                .hasMessageContaining("already canceled");
    }
}

/** ---- Example interfaces used above (replace/remove if you already have them) ---- */
interface ReservationRepository {
    Reservation save(Reservation r);
    Optional<Reservation> findById(String id);
}

interface AvailabilityService {
    boolean hasConflict(String roomId, LocalDate in, LocalDate out);
}

class ReservationService {
    private final ReservationRepository repo;
    private final AvailabilityService availability;

    ReservationService(ReservationRepository repo, AvailabilityService availability) {
        this.repo = repo; this.availability = availability;
    }

    Reservation create(Reservation r) {
        if (availability.hasConflict(r.getRoomId(), r.getCheckIn(), r.getCheckOut())) {
            throw new IllegalStateException("Dates overlap with existing reservation");
        }
        return repo.save(r);
    }

    Reservation editDates(String id, LocalDate in, LocalDate out) {
        Reservation existing = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        if (availability.hasConflict(existing.getRoomId(), in, out)) {
            throw new IllegalStateException("New dates overlap");
        }
        existing.setCheckIn(in);
        existing.setCheckOut(out);
        return repo.save(existing);
    }

    Reservation cancel(String id) {
        Reservation existing = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Reservation not found"));
        if (existing.getStatus() == ReservationStatus.CANCELED) {
            throw new IllegalStateException("Reservation already canceled");
        }
        existing.setStatus(ReservationStatus.CANCELED);
        return repo.save(existing);
    }
}

enum ReservationStatus { CONFIRMED, CANCELED }

class Reservation {
    private String id;
    private String hotelId;
    private String roomId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private int guests;
    private ReservationStatus status;

    public Reservation(String id, String hotelId, String roomId, LocalDate checkIn, LocalDate checkOut, int guests, ReservationStatus status) {
        this.id = id; this.hotelId = hotelId; this.roomId = roomId;
        this.checkIn = checkIn; this.checkOut = checkOut; this.guests = guests; this.status = status;
    }

    public String getId() { return id; }
    public String getHotelId() { return hotelId; }
    public String getRoomId() { return roomId; }
    public LocalDate getCheckIn() { return checkIn; }
    public LocalDate getCheckOut() { return checkOut; }
    public int getGuests() { return guests; }
    public ReservationStatus getStatus() { return status; }

    public void setCheckIn(LocalDate checkIn) { this.checkIn = checkIn; }
    public void setCheckOut(LocalDate checkOut) { this.checkOut = checkOut; }
    public void setStatus(ReservationStatus status) { this.status = status; }
}
