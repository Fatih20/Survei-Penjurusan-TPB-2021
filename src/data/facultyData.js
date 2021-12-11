const facultyList = [
    "STEI",
    "FTI",
    "FMIPA",
    "FTTM",
    "FITB",
    "FTMD",
    "SITH-S",
    "SITH-R",
    "SF",
    "FTSL",
    "SAPPK",
    "FSRD",
    "SBM",
]

let facultiesData = {}
for (const faculty of facultyList){
    const facultyData = {
        data : {
            peminat : `JSON/${faculty}-Peminat.json`,
            indeks : `JSON/${faculty}-Indeks-Peminat.json`,
        }
    }
    facultiesData[faculty] = facultyData;
}

export {facultiesData};

// Use list comprehension or something to automate the creation of object. Data should contain paths to corresponding JSON

