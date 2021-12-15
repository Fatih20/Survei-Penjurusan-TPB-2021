export function dataPeminatProcessed(data,ranking){
    const rankedData = data[ranking.toString()]
    const result = Object.keys(rankedData).map((jurusan) => {
        return {
            "nama" : jurusan,
            "besar" : rankedData[jurusan],
        }
    })

    return result;
}

export function dataIndeksPeminatProcessed(data, ranking) {
    const rankedData = data[ranking.toString()]
    const result = []
    Object.keys(rankedData).map((jurusan) => {
            result.push(
                {
                    "nama": jurusan,
                    "besar" : rankedData[jurusan]
                }
            )
    })

    return result;
}
