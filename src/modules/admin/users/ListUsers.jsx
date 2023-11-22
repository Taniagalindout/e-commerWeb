import React from "react";
import DataTable from "react-data-table-component";
import Badge from 'react-bootstrap/Badge';

const ListUser = () => {
  const getStatusBadgeVariant = statusId => (
    statusId === 1 ? 'success' : 'danger'
  );

  const columns = [
    {
      name: "Nombre",
      selector: row => row.name
    },
    {
      name: "Apellidos",
      selector: row => row.lastname
    },
    {
      name: "Email",
      selector: row => row.email
    },
    {
      name: "Telefono",
      selector: row => row.phone
    }, 
    {
      name: "Estado",
      cell: row => (
        <Badge bg={getStatusBadgeVariant(row.status.idStatus)}>
          {row.status.name}
        </Badge>
      )
    },
    {
      name: "Rol",
      selector: row => row.rol.roleName
    }
  ];

  const data = [
    {
      "idUser": 1,
      "rol": {
        "idRol": 123,
        "roleName": "Admin",
      },
      "name": "John",
      "lastname": "Doe",
      "phone": "123-456-7890",
      "email": "johndoe@example.com",
      "password": "hashed_password",
      "status": {
        "idStatus": 1,
        "name": "Activo"
      }
    },
    {
      "idUser": 2,
      "rol": {
        "idRol": 456,
        "roleName": "User",
      },
      "name": "Jane",
      "lastname": "Smith",
      "phone": "987-654-3210",
      "email": "janesmith@example.com",
      "password": "hashed_password",
      "status": {
        "idStatus": 2,
        "name": "Inactivo"
      }
    }
  ];

  return (
    <div className="container mt-5">
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default ListUser;
