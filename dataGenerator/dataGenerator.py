import pandas as pd
import dataAnalyzer as da
import json

faculty_and_jurusan = {
    "STEI" : [
        "Informatika", 
        "Sistem Teknologi Informasi", 
        "Teknik Elektro", 
        "Teknik Tenaga Listrik", 
        "Teknik Telekomunikasi", 
        "Teknik Biomedis",
    ],
    "FTI" : [
        "Teknik Kimia",
        "Teknik Fisika",
        "Manajemen Rekayasa",
        "Teknik Bioenergi dan Kemurgi",
        "Teknik Pangan",
        "Teknik Industri",
    ],
    "FMIPA" : [
        "Aktuaria",
        "Astronomi",
        "Fisika",
        "Kimia",
        "Matematika",
    ],
    "FTTM" : [
        "Teknik Pertambangan",
        "Teknik Perminyakan",
        "Teknik Geofisika",
        "Teknik Metalurgi",
    ],
    "FITB" : [
        "Teknik Geodesi & Geomatika",
        "Oseanografi",
        "Meteorologi",
        "Teknik Geologi",
    ],
    "FTMD" : [
        "Teknik Mesin",
        "Teknik Dirgantara",
        "Teknik Material"
    ],
    "SITH-S" : [
        "Biologi",
        "Mikrobiologi",
    ],
    "SITH-R" : [
        "Rekayasa Hayati",
        "Rekayasa Pertanian",
        "Rekayasa Kehutanan",
        "Teknologi Pascapanen",
    ],
    "SF" : [
        "Sains dan Teknologi Farmasi",
        "Farmasi Klinik dan Komunitas",
    ],
    "FTSL" : [
        "Teknik Sipil",
        "Teknik Lingkungan",
        "Teknik Kelautan",
        "Teknik dan Pengelolaan Sumber Daya Air",
        "Rekayasa Infrastruktur Lingkungan",
    ],
    "SAPPK" : [
        "Arsitektur",
        "Perencanaan Wilayah dan Kota"
    ],
    "FSRD" : [
        "Desain Interior",
        "Desain Komunikasi Visual",
        "Desain Produk",
        "Kriya",
        "Seni Rupa"
    ],
    "SBM" : [
        "Kewirausahaan",
        "Manajemen"
    ],
}


faculties_data_dict = {}

for faculty in faculty_and_jurusan:
    success = True
    try :
        first_jurusan = faculty_and_jurusan[faculty][0]
        last_jurusan = faculty_and_jurusan[faculty][-1]
        jumlah_jurusan = len(faculty_and_jurusan[faculty])
        data = pd.read_csv(f"dataGenerator/rawData/{faculty}.csv")
        
        data_peminat = da.data_minat(data, first_jurusan, last_jurusan, jumlah_jurusan)
        data_nilai_peminat = da.data_jurusan_dan_nilai_total(data, first_jurusan, last_jurusan, jumlah_jurusan)
        data_jurusan = list(data.loc[:, first_jurusan : last_jurusan].columns)

        # print(data_peminat)
        # print(data_nilai_peminat)
        # print(data_jurusan)


    except Exception as e :
            print(faculty)
            # print(jumlah_jurusan)
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