import React from "react";

const ElementList = ({ data, config, isPending }) => {

  if (isPending) { return <div className="text-center text-gray-500">Cargando...</div>; }

  return (
    <div>
      {data.length === 0 ? (
        <p>No hay elementos disponibles.</p>
      ) : (
        data.map((item) => (
          <config.card
            key={item._id}
            item={item}
            config={config}
          />
        ))
      )}
    </div>
  );
};

export default ElementList;
