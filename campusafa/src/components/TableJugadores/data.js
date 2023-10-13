import React from "react";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "NOMBRE", uid: "nombre", sortable: true},
  {name: "APELLIDO", uid: "apellido", sortable: true},
  {name: "DNI", uid: "dni", sortable: true},
  {name: "APODO", uid: "apodo"},
  {name: "POSICIÓN", uid: "posicion",sortable: true},
  {name: "PIÉ HABIL", uid: "piehabil"},
  {name: "CONVOCADO", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const statusOptions = [
  {name: "Si", uid: "si"},
  {name: "No", uid: "no"},
  {name: "Vacation", uid: "vacation"},
];

const users = [
  {
    id: 1,
    nombre: "Lara",
    apellido: "Setino",
    posicion: "Mandniment",
    piehabil: "Izquierdo",
    status: "si",
    dni: "29236854",
    foto: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    apodo: "tony.reichert@example.com",
  },
  {
    id: 2,
    nombre: "Leonel",
    apellido: "Messi",
    posicion: "Development",
    status: "no",
    dni: "25",
    foto: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    apodo: "zoey.lang@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 3,
    nombre: "Jane Fisher",
    apellido: "Sr. Dev",
    posicion: "Development",
    piehabil: "Izquierdo",
    status: "si",
    dni: "22",
    foto: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    apodo: "jane.fisher@example.com",
  },
  {
    id: 4,
    nombre: "William Howard",
    apellido: "C.M.",
    posicion: "Marketing",
    status: "vacation",
    dni: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    apodo: "william.howard@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 5,
    nombre: "Kristen Copper",
    apellido: "S. Mandnir",
    posicion: "Sales",
    status: "si",
    dni: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    apodo: "kristen.cooper@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 6,
    nombre: "Brian Kim",
    apellido: "P. Mandnir",
    posicion: "Mandniment",
    piehabil: "Izquierdo",
    dni: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    apodo: "brian.kim@example.com",
    status: "si",
  },
  {
    id: 7,
    nombre: "Michael Hunt",
    apellido: "Designer",
    posicion: "Design",
    status: "no",
    dni: "27",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
    apodo: "michael.hunt@example.com",
    piehabil: "Derecho",
  },
  {
    id: 8,
    nombre: "Samantha Brooks",
    apellido: "HR Mandnir",
    posicion: "HR",
    status: "si",
    dni: "31",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
    apodo: "samantha.brooks@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 9,
    nombre: "Frank Harrison",
    apellido: "F. Mandnir",
    posicion: "Finance",
    status: "vacation",
    piehabil: "Izquierdo",
    dni: "33",
    avatar: "https://i.pravatar.cc/150?img=4",
    apodo: "frank.harrison@example.com",
  },
  {
    id: 10,
    nombre: "Emma Adams",
    apellido: "Ops Manager",
    posicion: "Operations",
    status: "si",
    piehabil: "Izquierdo",
    dni: "35",
    avatar: "https://i.pravatar.cc/150?img=5",
    apodo: "emma.adams@example.com",
  },
  {
    id: 11,
    nombre: "Brandon Stevens",
    apellido: "Jr. Dev",
    piehabil: "Izquierdo",
    posicion: "Development",
    status: "si",
    dni: "22",
    avatar: "https://i.pravatar.cc/150?img=8",
    apodo: "brandon.stevens@example.com",
  },
  {
    id: 12,
    nombre: "Megan Richards",
    apellido: "P. Mandnir",
    posicion: "Product",
    status: "no",
    dni: "28",
    avatar: "https://i.pravatar.cc/150?img=10",
    apodo: "megan.richards@example.com",
    piehabil: "Izquierdo",  
  },
  {
    id: 13,
    nombre: "Oliver Scott",
    apellido: "S. Mandnir",
    posicion: "Security",
    piehabil: "Izquierdo",
    status: "si",
    dni: "37",
    avatar: "https://i.pravatar.cc/150?img=12",
    apodo: "oliver.scott@example.com",
  },
  {
    id: 14,
    nombre: "Grace Allen",
    apellido: "M. Specialist",
    piehabil: "Izquierdo",
    posicion: "Marketing",
    status: "si",
    dni: "30",
    avatar: "https://i.pravatar.cc/150?img=16",
    apodo: "grace.allen@example.com",
  },
  {
    id: 15,
    nombre: "Noah Carter",
    apellido: "IT Specialist",
    posicion: "I. Technology",
    status: "no",
    piehabil: "Izquierdo",
    dni: "31",
    avatar: "https://i.pravatar.cc/150?img=15",
    apodo: "noah.carter@example.com",
  },
  {
    id: 16,
    nombre: "Ava Perez",
    apellido: "Mandnir",
    posicion: "Sales",
    status: "si",
    dni: "29",
    avatar: "https://i.pravatar.cc/150?img=20",
    apodo: "ava.perez@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 17,
    nombre: "Liam Johnson",
    apellido: "Data Analyst",
    posicion: "Analysis",
    status: "si",
    dni: "28",
    avatar: "https://i.pravatar.cc/150?img=33",
    apodo: "liam.johnson@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 18,
    nombre: "Sophia Taylor",
    apellido: "QA Analyst",
    posicion: "Testing",
    status: "si",
    dni: "27",
    avatar: "https://i.pravatar.cc/150?img=29",
    apodo: "sophia.taylor@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 19,
    nombre: "Lucas Harris",
    apellido: "Administrator",
    posicion: "Information Technology",
    status: "no",
    dni: "32",
    avatar: "https://i.pravatar.cc/150?img=50",
    apodo: "lucas.harris@example.com",
    piehabil: "Izquierdo",
  },
  {
    id: 20,
    nombre: "Mia Robinson",
    apellido: "Coordinator",
    posicion: "Operations",
    status: "si",
    dni: "26",
    piehabil: "Izquierdo",
    avatar: "https://i.pravatar.cc/150?img=45",
    apodo: "mia.robinson@example.com",
  },
];
// const users = [
//   {
//     id: user.id,
//     nombre: user.nombre,
//     apellido: user.apellido,
//     posicion: user.posicion,
//     piehabil: user.piehabil,
//     status: user.status,
//     dni: user.dni,
//     foto: user.foto,
//     apodo: user.apodo,
//   }
// ]

export {columns, users, statusOptions};
