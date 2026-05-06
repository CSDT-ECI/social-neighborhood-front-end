export const getStringDataLocation = (user, conjunto, vivienda) => {
  return user?.tipoUsuario === 'Residente'
    ? `${vivienda.idconjunto}/${user.id}/${vivienda.idunidaddevivienda}`
    : `${conjunto.idconjunto}/${conjunto.idusuarioadministrador}/${conjunto.id}`;
};
