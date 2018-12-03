/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */

import { Selector } from 'testcafe';

fixture `aceptanceTest`
    .page `http://localhost:3000`;

test('Register-Full', async t => {
    await t
        .click(Selector('button').withText('Signup'))
        .click(Selector('button').withText('Register'))
        .click(Selector('button').withText('Register'))
        .expect(Selector('#externalMessage').textContent).eql('Please complete the entire form')
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), 'admin')
        .click(Selector('#checkPassword'))
        .typeText(Selector('#checkPassword'), 'admin')
        .click(Selector('#email'))
        .typeText(Selector('#email'), 'admin@admin.co.uk')
        .click(Selector('button').withText('Register'))
        .expect(Selector('#externalMessage').textContent).eql('Passwords too short')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '123')
        .click(Selector('#checkPassword'))
        .typeText(Selector('#checkPassword'), '1234')
        .click(Selector('button').withText('Register'))
        .expect(Selector('#externalMessage').textContent).eql('Passwords don\'t match')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '4')
        .click(Selector('button').withText('Register'))
        .expect(Selector('#externalMessage').textContent).eql('Username already in use')
        .click(Selector('#username'))
        .typeText(Selector('#username'), '12345')
        .click(Selector('button').withText('Register'));
});

test('Login-Full', async t => {
    await t
        .click(Selector('button').withText('Signup'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), 'incorrect')
        .click(Selector('[name="submit"].btn.btn-default'))
        .expect(Selector('#externalMessage').textContent).eql('Username and password don\'t match')
        .click(Selector('#password'))
        .pressKey('backspace backspace backspace backspace backspace backspace backspace backspace backspace backspace')
        .typeText(Selector('#password'), '12345')
        .click(Selector('[name="submit"].btn.btn-default'))
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('Logout'));
});

test('ContactUsOrReportBug-Full', async t => {
    await t
        .click(Selector('a').withText('Contant us'))
        .click(Selector('button').withText('Submit'))
        .expect(Selector('#externalMessage').textContent).eql('Please complete the entire form')
        .click(Selector('#fullName'))
        .typeText(Selector('#fullName'), 'Share File')
        .click(Selector('#email'))
        .typeText(Selector('#email'), 'fileShare@file.co.uk')
        .click(Selector('#inputMessage'))
        .typeText(Selector('#inputMessage'), 'Message here')
        .click(Selector('button').withText('Submit'));
});

test('ShareFile-Full', async t => {
    await t
        .click(Selector('button').withText('Signup'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '12345')
        .click(Selector('[name="submit"].btn.btn-default'))
        .click(Selector('button').withText('Submit'))
        .expect(Selector('#externalMessage').textContent).eql('Drop file before submit')
        .click(Selector('.drop-zone').find('div').withText('Drop file'))
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('Logout'));
});

test('GetFile-Full', async t => {
    await t
        .click(Selector('button').withText('Signup'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '12345')
        .click(Selector('[name="submit"].btn.btn-default'))
        .navigateTo('/getFile/5c04256d2a0db34770691e26')
        .click(Selector('button').withText('Download'));
});

test('Footer-Full', async t => {
    await t
        .click(Selector('.left-footer').find('a').withText('Home'))
        .click(Selector('.left-footer').find('a').withText('Login or Register'))
        .click(Selector('a').withText('Contant us'))
        .click(Selector('a').withText('FileSharing'))
        .click(Selector('.left-footer').find('a').withText('Login or Register'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '12345')
        .click(Selector('[name="submit"].btn.btn-default'))
        .click(Selector('.left-footer').find('a').withText('Home'))
        .click(Selector('.left-footer').find('a').withText('Login or Register'))
        .click(Selector('.left-footer').find('a').withText('Share File'))
        .click(Selector('a').withText('My Files'))
        .click(Selector('a').withText('Contant us'))
        .click(Selector('a').withText('Report bug'))
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('Logout'));
});

test('Header-Full', async t => {
    await t
        .click(Selector('.parallel'))
        .click(Selector('.bm-item-list').find('a').withText('Home'))
        .click(Selector('.bar2'))
        .click(Selector('.bm-item-list').find('a').withText('Login or Register'))
        .click(Selector('a').withText('FileSharing'))
        .click(Selector('button').withText('Login'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '12345')
        .click(Selector('[name="submit"].btn.btn-default'))
        .click(Selector('.bar2'))
        .click(Selector('.bm-item-list').find('a').withText('Home'))
        .click(Selector('.parallel'))
        .click(Selector('.bm-item-list').find('a').withText('Login or Register'))
        .click(Selector('.parallel'))
        .click(Selector('.bm-item-list').find('a').withText('Share File'))
        .click(Selector('a').withText('FileSharing'))
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('Share File'))
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('My Files'))
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('Profile'))
        .hover(Selector('.infoDropDown'));
});

test('Home', async t => {
    await t
        .expect(Selector('button').withText('Signup').textContent).eql('Signup')
        .click(Selector('button').withText('Signup'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '12345')
        .click(Selector('[name="submit"].btn.btn-default'))
        .click(Selector('a').withText('FileSharing'))
        .expect(Selector('p').withText('Welcome admin').textContent).eql('Welcome admin!')
        .expect(Selector('button').withText('Share File').textContent).eql('Share File')
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('Logout'))
        .expect(Selector('button').withText('Signup').textContent).eql('Signup');
});

test('Profile-full', async t => {
    await t
        .click(Selector('button').withText('Signup'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'admin')
        .click(Selector('#password'))
        .typeText(Selector('#password'), '12345')
        .click(Selector('[name="submit"].btn.btn-default'))
        .hover(Selector('.infoDropDown'))
        .click(Selector('.profileDropDown').find('div').withText('Profile'))
        .click(Selector('p').withText('Current Username').find('[alt="Pencil Edit Img"].pencil'))
        .click(Selector('button').withText('Submit'))
        .expect(Selector('#externalMessage').textContent).eql('Please complete the username field')
        .click(Selector('p').withText('Current Email').find('[alt="Pencil Edit Img"].pencil'))
        .click(Selector('button').withText('Submit'))
        .expect(Selector('#externalMessage').textContent).eql('Please complete both fields')
        .click(Selector('p').withText('Current Username').find('[alt="Pencil Edit Img"].pencil'))
        .click(Selector('button').withText('Submit'))
        .expect(Selector('#externalMessage').textContent).eql('Please complete the email field')
        .click(Selector('p').withText('Current Username').find('[alt="Pencil Edit Img"].pencil'))
        .click(Selector('#username'))
        .typeText(Selector('#username'), 'newAdmin')
        .click(Selector('#email'))
        .typeText(Selector('#email'), 'newAdmin@gmail.com')
        .click(Selector('#email'))
        .click(Selector('button').withText('Submit'))
        .expect(Selector('#externalMessage').textContent).eql('Successfully updated profile');
});