import userGlucoseModel from "../models/userGlucoseModel.js";
import DempsterShafer from "../service/DempsterShafer.js";
// Fungsi utama untuk diagnosa diabetes dan menyimpan data
export const diagnoseDiabetes = async (req, res) => {
    const ds = new DempsterShafer();

    // Ambil data dari request body
    const { 
        fullName, 
        age, 
        date, 
        gender, 
        diabetesHistory, 
        fastingBloodGlucose, 
        randomBloodSugarTest, 
        oralGlucose, 
        symptoms 
    } = req.body;

    // Langkah 1: Tambahkan data ke dalam database
    const userGlucoseData = new userGlucoseModel({
        fullName,
        age,
        date,
        gender,
        diabetesHistory,
        fastingBloodGlucose,
        randomBloodSugarTest,
        oralGlucose,
        bodyBecomeThin: symptoms.bodyBecomeThin || false,
        urinatingALot: symptoms.urinatingALot || false,
        gettingThirstyEasily: symptoms.gettingThirstyEasily || false,
        tingling: symptoms.tingling || false,
        breakingBreath: symptoms.breakingBreath || false,
        moreFourKilo: symptoms.moreFourKilo || false,
        dizziness: symptoms.dizziness || false,
        obstacles: symptoms.obstacles || false,
        coughing: symptoms.coughing || false,
        pregnant: symptoms.pregnant || false,
        weak: symptoms.weak || false,
        blurredVision: symptoms.blurredVision || false,
        vomiting: symptoms.vomiting || false,
        pale: symptoms.pale || false,
        nausea: symptoms.nausea || false,
        wounds: symptoms.wounds || false,
    });

    try {
        // Simpan data ke MongoDB
        await userGlucoseData.save();

        // Langkah 2: Diagnosa diabetes
        // Mengatur kepercayaan berdasarkan input
        if (fastingBloodGlucose < 100 && randomBloodSugarTest < 140 && oralGlucose < 140) {
            ds.addBelief('Tidak Diabetes', 0.9); // Sangat mungkin tidak diabetes
        } else if (fastingBloodGlucose >= 126 && randomBloodSugarTest >= 200 && oralGlucose >= 200 && age >= 30) {
            ds.addBelief('DM2', 0.9); // Hanya jika semua syarat untuk DM2 terpenuhi
        } else if (fastingBloodGlucose >= 150) {
            ds.addBelief('DM1', 0.7); // Hanya jika glukosa puasa sangat tinggi, mendukung DM1
        }

        // Tambahkan logika untuk DMG
        if (age >= 20 && age <= 35 && symptoms.pregnant) {
            ds.addBelief('DMG', 0.8); // Meningkatkan kemungkinan DMG jika wanita hamil
        }

        // Cek kondisi berdasarkan gejala
        if (diabetesHistory) {
            ds.combineBeliefs({ 'DM1': 0.5, 'DM2': 0.5, 'DMG': 0.5 }); // Mengatur ulang kepercayaan berdasarkan riwayat
        }

        // Cek gejala dari object symptoms
        Object.values(symptoms).forEach(symptom => {
            if (symptom) {
                ds.combineBeliefs({ 'DM1': 0.3, 'DM2': 0.3, 'DMG': 0.3 });
            }
        });

        // Hasil akhir
        const result = ds.getBestHypothesis();

        // Simpan hasil diagnosis ke userGlucoseData
        userGlucoseData.diagnosisResult = {
            hypothesis: result.hypothesis || "Tidak Diabetes", // Default ke "Tidak Diabetes" jika null
            belief: result.belief || 0 // Pastikan ini adalah nilai numerik
        };

        // Simpan ulang dokumen dengan hasil diagnosis
        await userGlucoseData.save();

        // Kembalikan response
        return res.status(200).json({
            message: "Data dan hasil diagnosis berhasil disimpan.",
            diagnosis: result,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Terjadi kesalahan saat menyimpan data: ${error.message}` });
    }
};




// Fungsi untuk mendapatkan data diagnosis terbaru
export const getLatestDiagnosis = async (req, res) => {
    try {
        // Mengambil data terakhir yang diurutkan berdasarkan createdAt
        const latestDiagnosis = await userGlucoseModel.findOne().sort({ createdAt: -1 });

        if (!latestDiagnosis) {
            return res.status(404).json({ message: "Tidak ada data diagnosis yang ditemukan." });
        }

        // Kembalikan response dengan data diagnosis terbaru
        return res.status(200).json({
            message: "Data diagnosis terbaru berhasil diambil.",
            data: latestDiagnosis,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Terjadi kesalahan saat mengambil data diagnosis terbaru." });
    }
};

