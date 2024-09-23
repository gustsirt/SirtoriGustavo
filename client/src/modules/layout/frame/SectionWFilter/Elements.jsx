import React from "react";

const ElementList = ({ data, Card, isPending }) => {

  if (isPending) { return <div className="text-center text-gray-500">Cargando...</div>; }

  return (
    <div>
      {data.length === 0 ? (
        <p>No hay elementos disponibles.</p>
      ) : (
        data.map((item) => (
          <Card key={item._id} item={item} />
        ))
      )}
    </div>
  );
};

export default ElementList;
