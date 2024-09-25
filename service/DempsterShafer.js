class DempsterShafer {
    constructor() {
        this.beliefs = {}; // key: hypothesis, value: belief mass
    }

    // Menambahkan belief untuk hipotesis tertentu
    addBelief(hypothesis, beliefMass) {
        if (!this.beliefs[hypothesis]) {
            this.beliefs[hypothesis] = beliefMass;
        } else {
            this.beliefs[hypothesis] += beliefMass;
        }
    }

    // Menggabungkan dua belief dengan metode Dempster Shafer
    combineBeliefs(newBeliefs) {
        let combined = {};

        // Hitung semua kombinasi antara belief yang ada dengan belief baru
        for (let h1 in this.beliefs) {
            for (let h2 in newBeliefs) {
                let intersect = h1 === h2 ? h1 : 'conflict'; // Jika hipotesis sama, simpan, jika tidak, sebut konflik
                if (!combined[intersect]) {
                    combined[intersect] = 0;
                }
                combined[intersect] += this.beliefs[h1] * newBeliefs[h2];
            }
        }

        // Normalisasi jika ada konflik
        let conflictMass = combined['conflict'] || 0;
        delete combined['conflict'];
        for (let h in combined) {
            combined[h] /= (1 - conflictMass);
        }

        this.beliefs = combined;
    }

    // Mendapatkan hipotesis dengan kepercayaan tertinggi
    getBestHypothesis() {
        let maxBelief = -1;
        let bestHypothesis = null;

        for (let hypothesis in this.beliefs) {
            if (this.beliefs[hypothesis] > maxBelief) {
                maxBelief = this.beliefs[hypothesis];
                bestHypothesis = hypothesis;
            }
        }

        return { hypothesis: bestHypothesis, belief: maxBelief };
    }
}

export default DempsterShafer;