import mongoose from "mongoose";

const userGlucose = new mongoose.Schema({
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
    symptoms: {
        type: [String],
        required: true,
    }
}, { timestamps: true })