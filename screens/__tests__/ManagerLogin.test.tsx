import { validate } from '../ManagerLogin'


test('Wrong Validate', () => {
    expect(validate("Wrong_email_format", "asdf")).toBe(false)
});

test('Correct Validate', () => {
    expect(validate("correct@email.format", "asdf")).toBe(true)
});