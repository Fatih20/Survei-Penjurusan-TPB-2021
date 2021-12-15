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

export function percentMaker (data){
    let total = 0;
    data.forEach((entry) => {
        total = total + entry["besar"]
    })
    let accountedPercent = 0;
    let result = JSON.parse(JSON.stringify(data));
    data.forEach((entry, index)=>{
        let percent = 0;
        if (index !== data.length-1){
            percent = Math.round(100*entry["besar"]/total)
            console.log(percent)
            accountedPercent += percent
        } else {
            percent = 100-accountedPercent
        }
        result[index]["persen"] = percent
    })

    return result;
}
