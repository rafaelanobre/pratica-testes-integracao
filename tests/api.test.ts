import app from "index";
import supertest from "supertest";

const server = supertest(app);

describe("API test", () => {
    it("should return status 200 and response OK! at /health", async () => {
        const response = await server.get('/health')
        expect(response.status).toBe(200)
        expect(response.text).toBe('ok!')
    })
})