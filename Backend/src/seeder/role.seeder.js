const Role = require("../schema/role.schema");

async function seedRoles() {
    try {
        const existingRoles = await Role.find({});

        if (existingRoles.length === 0) {
            await Role.create([
                {
                    name: "user",
                    permissions: ["read"]
                },
                {
                    name: "admin",
                    permissions: ["create", "read", "update", "delete"]
                },{
                    name:"creator",
                    permissions:["create","read","update","delete"]
                }
            ]);
            console.log("Default roles ('user', 'admin','creator') seeded successfully!");
        }
    } catch (error) {
        console.error("Error seeding roles", error);
    }
}
 
module.exports = seedRoles;