import pandas as pd
import dataAnalyzer as da
import json

faculty_list = [
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

faculties_data_dict = {}

for faculty in faculty_list:
    success = True
    try :
        data = pd.read_csv(f"dataGenerator/rawData/{faculty}.csv")
        
        data_peminat = da.data_minat(data)
        data_nilai_peminat = da.data_jurusan_dan_nilai_total(data)
        data_jurusan = list(data.loc[:, "Informatika":"Teknik Biomedis"].columns)

        # print(data_peminat)
        # print(data_nilai_peminat)
        # print(data_jurusan)


    except Exception as e :
            print(e)
            success = False
            # print(faculty)
            pass
    faculties_data_dict[faculty] = {}

    if success :
        faculties_data_dict[faculty]["dataPeminat"] = data_peminat
        faculties_data_dict[faculty]["dataIndeksPeminat"] = data_nilai_peminat
        faculties_data_dict[faculty]["dataJurusan"] = data_jurusan

json_faculties_data = json.dumps(faculties_data_dict, indent = 4)


with open("src/data/facultyData.json", "w") as outfile:
    outfile.write(json_faculties_data)