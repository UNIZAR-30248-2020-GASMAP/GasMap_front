import ManagerLogin from '../ManagerLogin'


test('Wrong Validate', () => {
    const mng = new ManagerLogin(null)
    expect(mng.validate("Wrong_email_format", "asdf")).toBe(false)
});

test('Correct Validate', () => {
    const mng = new ManagerLogin(null)
    expect(mng.validate("correct@email.format", "asdf")).toBe(true)
});