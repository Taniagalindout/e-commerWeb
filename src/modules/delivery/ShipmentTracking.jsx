import React from 'react';
import DataTable from 'react-data-table-component';
import { Badge } from 'react-bootstrap';

const ShipmentTracking = () => {
  const data = [
    { id: 1, name: 'vamos a ver como se ve un producto que tenga un nombre  largo', status: 'Pendiente' },
    { id: 2, name: 'Blusa roja cuello redondo', status: 'Pendiente' },
    { id: 3, name: 'Pantalla Samsung 80"', status: 'Entregado' },
    { id: 4, name: 'Cámara digital de alta resolución', status: 'Pendiente' },
    { id: 5, name: 'Reloj inteligente con monitor de actividad física', status: 'Pendiente' },
    { id: 6, name: 'Tableta táctil con pantalla HD', status: 'Entregado' },
    { id: 7, name: 'Impresora multifunción de tinta continua', status: 'Pendiente' },
    { id: 8, name: 'Set de utensilios de cocina de acero inoxidable', status: 'Pendiente' },
    { id: 9, name: 'Silla ergonómica de oficina', status: 'Entregado' },
    { id: 10, name: 'Set de maletas de viaje ultraligeras', status: 'Pendiente' },
    { id: 11, name: 'Sistema de seguridad para el hogar con cámaras de vigilancia', status: 'Pendiente' },
    { id: 12, name: 'Máquina de café espresso automática', status: 'Entregado' },
    { id: 13, name: 'Set de organizadores de cajones y armarios', status: 'Pendiente' },
    { id: 14, name: 'Sistema de iluminación inteligente para el hogar', status: 'Pendiente' },
    { id: 15, name: 'Kit de pinturas acrílicas de calidad profesional', status: 'Entregado' },
  ];

  const columns = [
    { name: '#', selector: 'id'},
    { name: 'Pedido', selector: 'name'},
    {
      name: 'Status',
      selector: 'status',
      cell: (row) => (
        <Badge
          className={row.status === 'Entregado' ? 'bg-success' : 'bg-danger'}
        >
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <h2>Envíos SaleHub</h2>
        <DataTable
          title="Seguimiento de envíos"
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          responsive
        />
    </div>
  );
};

export default ShipmentTracking;
