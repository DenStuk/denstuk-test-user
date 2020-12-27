import { TestFactory } from "../init";
import { createUser } from "../mocks/createUser";

describe("/api-token-auth", () => {
    const factory = new TestFactory();

    beforeEach(async () => {
        await factory.init();
    });

    afterEach(async () => {
        await factory.close();
    });

    describe("POST /api-token-auth", () => {
        it("Should not return a status code 404", async () => {
            const response = await factory.app.post("/api-token-auth");
            expect(response.status).not.toEqual(404);
        });
        it("Should return a status code 400", async () => {
            const response = await factory.app.post("/api-token-auth");
            expect(response.status).toEqual(400);
        });
        it("Should return a status code 400", async () => {
            const response = await factory.app.post("/api-token-auth");
            expect(response.status).toEqual(400);
        });
        it("Should return a status code 404", async () => {
            const response = await factory.app.post("/api-token-auth")
                .send({ username: "TestUser", password: "TestPassword" });
            expect(response.status).toEqual(404);
        });
        it("Should return a status code 200", async () => {
            await createUser("test", "password");
            const response = await factory.app.post("/api-token-auth")
                .send({ username: "test", password: "password" });
            expect(response.status).toEqual(200);
            expect(response.body).toHaveProperty("token")
        });
    });
});