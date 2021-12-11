export function peminat(rawData, ranking){
    let result = [];
    const examinedData = rawData[ranking];
    Object.keys(examinedData).map((jurusan) => {
        result.push({
            namaJurusan : jurusan,
            jumlah : examinedData[jurusan],
        })
    })
    return result;
}