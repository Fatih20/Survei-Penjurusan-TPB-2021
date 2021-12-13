// const facultyList = [
//     "STEI",
//     "FTI",
//     "FMIPA",
//     "FTTM",
//     "FITB",
//     "FTMD",
//     "SITH-S",
//     "SITH-R",
//     "SF",
//     "FTSL",
//     "SAPPK",
//     "FSRD",
//     "SBM",
// ]

// async function retrieveJurusan(path){
//     const data = await import(`./${path}`);
//     const jurusanList = Object.keys(data["1"])
//     return jurusanList;
// }

// let facultiesData = {}
// for (const faculty of facultyList){
//     let facultyData = {
//         data : {
//             peminat : `JSON/${faculty}-Peminat.json`,
//             indeks : `JSON/${faculty}-Indeks-Peminat.json`,
//         }
//     }
//     facultiesData[faculty] = facultyData;
// }

// for (const faculty of facultyList){
//     if (faculty === "STEI"){
//         retrieveJurusan(facultiesData[faculty].data.peminat).then((jurusanList) => {
//             facultiesData[faculty].jurusan = jurusanList;
//         })
//     }
// }

// export {facultiesData};

