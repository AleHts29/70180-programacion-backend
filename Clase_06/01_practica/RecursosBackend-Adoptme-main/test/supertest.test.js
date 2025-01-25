import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect
const requester = supertest("http://localhost:8080");

// se ejecuta con: npx mocha test/dao/Users.dao.test.js



describe("Testing Adoptme App", () => {

    /* =====================================
    =               Section 01             =
    ===================================== */
    describe("Testing Pets Api", () => {


        // Test 01
        it("Crear Mascota: El API POST /api/pets debe crear una nueva mascota correctamente", async () => {
            // Given
            const petMock = {
                name: "Patitas",
                specie: "pez",
                birthDate: "10-10-2022"
            }



            // Then
            const { statusCode, _body } = await requester.post('/api/pets').send(petMock)
            // console.log(result);



            // Assert
            expect(statusCode).is.eqls(201)
            expect(_body.payload).is.ok.and.to.have.property('_id')
            expect(_body.payload).to.have.property('adopted').and.to.be.deep.eqls(false)
        })



        // Test 02
        it("Crear Mascota sin nombre: El API POST /api/pets debe retornar un estado HTTP 400 con error.", async () => {
            // Given
            const petMock = {
                specie: "pez",
                birthDate: "10-10-2022"
            }

            // Then
            const { statusCode, _body } = await requester.post('/api/pets').send(petMock)


            // Assert
            expect(statusCode).is.eqls(400)
            expect(_body).is.ok.and.to.have.property('error')
            expect(_body).to.have.property('status')
        })


        // // Test 02
        it("Crear mascota con Avatar (Test con uploads): Debe poder crearse una mascota con la ruta de la imagen.", async () => {
            // Given
            const petMock = {
                name: "Orejitas",
                specie: "cat",
                birthDate: "10-11-2022"
            }

            // Then
            const result = await requester.post('/api/pets/withimage')
                .field('name', petMock.name)
                .field('specie', petMock.specie)
                .field('birthDate', petMock.birthDate)
                .attach('image', './test/files/coderDog.jpg')


            // Assert
            expect(result.statusCode).to.eql(200)
            expect(result._body.payload.image).to.be.ok;
        })

    })




    // /* =====================================
    // =               Section 02             =
    // ===================================== */
    describe("Testing users Api", () => {

        before(function () {
            this.cookie;
            this.mockUser = {
                first_name: "Usuario de prueba 2",
                last_name: "Apellido de prueba 2",
                email: "correodeprueba2@gmail.com",
                password: "123456"
            }
        })


        // Test 01 - Registro de un User
        it("Test Registro Usuario: Debe poder registrar correctamente un usuario", async function () {
            // Given


            // Then
            const { statusCode } = await requester.post('/api/sessions/register').send(this.mockUser)


            // Assert
            expect(statusCode).is.eqls(200)

        })


        // Test 02 - Login de un User
        it("Test Login Usuario: Debe poder hacer login correctamente con el usuario registrado previamente y obtener la cookie", async function () {
            // Given
            const mockLogin = {
                email: this.mockUser.email,
                password: this.mockUser.password
            }


            // Then
            const result = await requester.post('/api/sessions/login').send(mockLogin)
            // console.log(result);


            expect(result.status).is.eqls(200);



            const cookieResult = result.header['set-cookie'][0]
            // console.log("cookieResult: ", cookieResult);

            const cookiData = cookieResult.split('=');


            this.cookie = {
                name: cookiData[0],
                value: cookiData[1]
            };

            // console.log("this.cookie", this.cookie);


            // Assert
            expect(this.cookie.name).to.be.ok.and.eql('coderCookie');
            expect(this.cookie.value).to.be.ok;

        })


        // Test 03 - Ruta protegida
        it("Test Ruta Protegida: Debe enviar la cookie que contiene el usuario y destructurarla correctamente.", async function () {


            // Then
            const { _body } = await requester.get('/api/sessions/current').set('cookie', [`${this.cookie.name}=${this.cookie.value}`])

            console.log(_body);



            // Assert
            expect(_body.payload.email).to.be.ok.and.eql(this.mockUser.email)

        })

    })


})