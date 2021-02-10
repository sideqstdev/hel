import { validateEmail } from "../src/util/services/Validation.service";

let validEmails: string[] = [`email@sideqst.com`, `firstname.lastname@sideqst.com`, `email@subdomain.sideqst.com`, `"email"@sideqst.com`, `1234567890@sideqst.com`, `email@sideqst-one.com`, `_______@sideqst.com`,
`email@sideqst.name`, `email@sideqst.museum`, `email@sideqst.co.jp`, `firstname-lastname@sideqst.com`]

validEmails.map(email => {
    test(`validates email: ${email} to true `, () => {
        expect(validateEmail(email)).toBe(true);
    })
})

let invalidEmails: string[] = [`plainaddress`,`#@%^%#$@#$@#.com`,`@sideqst.com`, `Joe Smith <email@sideqst.com>`, `email.sideqst.com`,
`email@sideqst@sideqst.com`, `.email@sideqst.com`, `email.@sideqst.com`, `email..email@sideqst.com`, `email@sideqst.com (Joe Smith)`,
`email@sideqst`, `email@-sideqst.com`, `email@111.222.333.44444`, `email@sideqst..com`, `Abc..123@sideqst.com`]

invalidEmails.map(email => {
    test(`invalidates email: ${email} to false `, () => {
        expect(validateEmail(email)).toBe(false);
    })
})