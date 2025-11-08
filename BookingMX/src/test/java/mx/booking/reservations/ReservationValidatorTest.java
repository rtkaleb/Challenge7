package mx.booking.reservations;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.*;

/** Pure validation examples — no mocks needed. */
class ReservationValidatorTest {

    private final ReservationValidator validator = new ReservationValidator();

    @Test
    @DisplayName("Valid dates: check-in before check-out")
    void validDates() {
        assertThat(validator.validateDates(LocalDate.now().plusDays(1), LocalDate.now().plusDays(3))).isTrue();
    }

    @Test
    @DisplayName("Invalid dates: check-in equal to or after check-out")
    void invalidDates() {
        assertThat(validator.validateDates(LocalDate.now(), LocalDate.now())).isFalse();
        assertThat(validator.validateDates(LocalDate.now().plusDays(3), LocalDate.now().plusDays(1))).isFalse();
    }

    @Test
    @DisplayName("Guests within capacity")
    void capacity_ok() {
        assertThat(validator.validateGuests(2, 4)).isTrue();
    }

    @Test
    @DisplayName("Guests exceed capacity")
    void capacity_fail() {
        assertThat(validator.validateGuests(5, 4)).isFalse();
    }
}

/** Simple validator (replace with your own app code) */
class ReservationValidator {
    boolean validateDates(LocalDate in, LocalDate out) {
        return in != null && out != null && in.isBefore(out);
    }
    boolean validateGuests(int guests, int capacity) {
        return guests > 0 && guests <= capacity;
    }
}
