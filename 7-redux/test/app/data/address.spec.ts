import {Address} from "../../../app/data/address";

export function main() {
    describe("Address", function () {
        it("can assign and read values", function () {
            const address = new Address();
            address.street = "Warringah Road";
            address.city = "Sydney";
            expect(address.street).toBe("Warringah Road");
            expect(address.city).toBe("Sydney");
        });
    });
}
