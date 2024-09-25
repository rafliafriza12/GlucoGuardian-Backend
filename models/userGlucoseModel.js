import mongoose from "mongoose";

const UserGlucose = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    age: {
        type: Number,  // Gunakan 'Number' dengan huruf besar untuk tipe angka
        required: true,
    },
    date: {
        type: Date,    // Tipe data untuk tanggal
        required: true,
    },
    gender:{
        type: Boolean,
        required: true,
    },
    diabetesHistory:{
        type: Boolean,
        required: true,
    },
    fastingBloodGlucose: {
        type: Number,
        required: true,
    },
    randomBloodSugarTest: {
        type: Number,
        required: true,
    },
    oralGlucose:{
        type: Number,
        required: true,
    },
    bodyBecomeThin: {
        type: Boolean,
        required: true,
    },
    urinatingALot: {
        type: Boolean,
        required: true,
    },
    gettingThirstyEasily: {
        type: Boolean,
        required: true,
    },
    tingling: {
        type: Boolean,
        required: true,
    },
    breakingBreath: {
        type: Boolean,
        required: true,
    },
    moreFourKilo: {
        type: Boolean,
        required: true,
    },
    dizziness: {
        type: Boolean,
        required: true,
    },
    obstacles: {
        type: Boolean,
        required: true,
    },
    coughing: {
        type: Boolean,
        required: true,
    },
    pregnant: {
        type: Boolean,
        required: true,
    },
    weak: {
        type: Boolean,
        required: true,
    },
    blurredVision: {
        type: Boolean,
        required: true,
    },
    vomiting: {
        type: Boolean,
        required: true,
    },
    pale: {
        type: Boolean,
        required: true,
    },
    nausea: {
        type: Boolean,
        required: true,
    },
    wounds: {
        type: Boolean,
        required: true,
    },
    diagnosisResult: {
        type: {
            hypothesis: {
                type: String,
                required: true,
                default: "Tidak diabetes",
            },
            belief: {
                type: Number,
                required: true,
            },
        },
        default: null,
    },
}, { timestamps: true });

export default mongoose.model("UserGlucose", UserGlucose);