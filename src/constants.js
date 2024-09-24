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
        null: false,
        type: "NUMERIC",
        length: [20, 0]
    },
    "nit": {
        null: false,
        type: "VARCHAR",
        length: 60
    },
    "cuenta": {
        null: true,
        type: "VARCHAR",
        length: 60
    },
    "nombre": {
        null: true,
        type: "VARCHAR",
        length: 300
    },
    "concepto": {
        null: true,
        type: "VARCHAR",
        length: 20
    },
    "porcentaje": {
        null: false,
        type: "NUMERIC",
        length: [3, 0]
    },
    "base": {
        null: false,
        type: "NUMERIC",
        length: [14, 2]
    },
    "iva": {
        null: false,
        type: "NUMERIC",
        length: [14, 2]
    },
    "retenido": {
        null: false,
        type: "NUMERIC",
        length: [14, 2]
    },
    "año": {
        null: false,
        type: "NUMERIC",
        length: [4, 0]
    },
    "periodo": {
        null: false,
        type: "NUMERIC",
        length: [2, 0]
    },
    "ciudad_pago": {
        null: true,
        type: "VARCHAR",
        length: 30
    },
    "ciudad_expedido": {
        null: true,
        type: "VARCHAR",
        length: 30
    },
    "banco_pago": {
        null: true,
        type: "NUMERIC",
        length: [6, 0]
    },
    "ind_iva": {
        null: true,
        type: "NUMERIC",
        length: [6, 0]
    },
    "fecha-expedicion": {
        null: true,
        type: "DATE",
        length: 0
    }
};