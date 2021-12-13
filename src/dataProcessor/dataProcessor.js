export function dataPeminatProcessed(data,ranking){
    const rankedData = data[ranking.toString()]
    const result = Object.keys(rankedData).map((jurusan) => {
        return {
            "namaJurusan" : jurusan,
            "jumlahPeminat" : rankedData[jurusan],
        }
    })

    return result;
}

export function dataIndeksPeminatProcessed(data, ranking) {
    const rankedData = data[ranking.toString()]
    const result = [{"name" : "Jurusan"}]
    Object.keys(rankedData).map((jurusan) => {
            result[0][jurusan] = rankedData[jurusan];
    })

    return result;
}
