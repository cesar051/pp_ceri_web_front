export const USER_STATES = {
    "A": {
        "label": "Activo",
        "BD_KEY": "A",
        "color": "#28a745"
    },
    "I": {
        "label": "Inactivo",
        "BD_KEY": "I",
        "color": "#D20103"
    }
}

export const requiredColumnsUploadIVA = {
    "id_empresa": {
        mandatory: false,
        default_value: -1,
        null: false,
        type: "NUMERIC",
        length: [20, 0],
        optional_names: ['idEmpresa', 'id-empresa']
    },
    "nit": {
        mandatory: true,
        null: false,
        type: "VARCHAR",
        length: 60,
        optional_names: []
    },
    "cuenta": {
        mandatory: true,
        null: true,
        type: "VARCHAR",
        length: 60,
        optional_names: []
    },
    "descripcion": {
        mandatory: true,
        null: true,
        type: "VARCHAR",
        length: 300,
        optional_names: ['nombre']
    },
    "concepto": {
        mandatory: true,
        null: true,
        type: "VARCHAR",
        length: 40,
        optional_names: []
    },
    "porcentaje": {
        mandatory: true,
        null: false,
        type: "NUMERIC",
        length: [5, 2],
        optional_names: [],
        cast: (num) => +(Math.round(num + `e2`) + `e-2`)
    },
    "base": {
        mandatory: true,
        null: false,
        type: "NUMERIC",
        length: [14, 2],
        optional_names: [],
        cast: (num) => +(Math.round(num + `e2`) + `e-2`)
    },
    "iva": {
        mandatory: false,
        null: true,
        default_value: 0,
        type: "NUMERIC",
        length: [14, 2],
        optional_names: [],
        cast: (num) => +(Math.round(num + `e2`) + `e-2`)
    },
    "retenido": {
        mandatory: true,
        null: false,
        type: "NUMERIC",
        length: [14, 2],
        optional_names: [],
        cast: (num) => +(Math.round(num + `e2`) + `e-2`)
    },
    "year": {
        mandatory: true,
        null: false,
        type: "NUMERIC",
        length: [4, 0],
        optional_names: ['ano', 'año']
    },
    "periodo": {
        mandatory: true,
        null: false,
        type: "NUMERIC",
        length: [2, 0],
        optional_names: []
    },
    "ciudad_pago": {
        mandatory: true,
        null: true,
        type: "VARCHAR",
        length: 30,
        optional_names: ['ciudad-pago']
    },
    "ciudad_expedido": {
        mandatory: true,
        null: true,
        type: "VARCHAR",
        length: 30,
        optional_names: ['ciudad-expedido']
    },
    "banco_pago": {
        mandatory: true,
        null: true,
        type: "NUMERIC",
        length: [6, 0],
        optional_names: ['banco_pago']
    },
    "indicador_impuesto": {
        mandatory: true,
        null: true,
        type: "NUMERIC",
        length: [6, 0],
        optional_names: ['ind-iva', 'ind_ica', 'indrfte', 'ind_iva']
    },
    "fecha_expedicion": {
        mandatory: true,
        null: true,
        type: "DATE",
        length: 0,
        optional_names: ['fecha-expedicion'],
        cast: (date) => (Number.isInteger(date) ? new Date(1899, 11, 30 + date).toISOString().slice(0, 10) : date)
    }
};

export const AVAILABLE_YEARS_FOR_EXPORT = [
    {
        value: "2025",
        label: "2025"
    },
    {
        value: "2024",
        label: "2024"
    },
    {
        value: "2023",
        label: "2023"
    },
    {
        value: "2022",
        label: "2022"
    },
    {
        value: "2021",
        label: "2021"
    },
]

export const AVAILABLE_PERIODS_FOR_EXPORT = [
    {
        value: "1",
        label: "1"
    },
    {
        value: "2",
        label: "2"
    },
     {
        value: "3",
        label: "3"
    },

     {
        value: "4",
        label: "4"
    },

     {
        value: "5",
        label: "5"
    },

     {
        value: "6",
        label: "6"
    }


]

export const COMPANY_INFO = {
    razon_social_completa: 'ALMACENES MAXIMO S.A.S.',
    nit: '860045854',
    direccion: 'Cra. 106 No.15A-25 Mz 4 int 37 ZF',
    municipio: 'Bogotá',
    departamento: 'Cundinamarca'
}