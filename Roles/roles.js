const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = function () {
  ///BASIC:: LE E ATUALIZA APENAS SEU PROPRIO PERFIL
  ac.grant("basic").readOwn("profile").updateOwn("profile");

  ///SUPERVISOR:: LE TODOS O PERFILS
  ac.grant("supervisor").extend("basic").readAny("profile");

  ///ADMIN:: LE E ATUALIZA TUDOO
  ac.grant("admin")
    .extend("basic")
    .extend("supervisor")
    .updateAny("profile")
    .deleteAny("profile")
    .readAny("profile");
  return ac;
};
