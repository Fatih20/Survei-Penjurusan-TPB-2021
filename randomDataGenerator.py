import pandas as pd
import names
import random
import numpy as np

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

nilai_list = ["A", "AB", "B", "BC", "C", "D", "E"]

for faculty in faculty_and_jurusan:
    ranking_list = [i for i in range(1, len(faculty_and_jurusan[faculty])+1)]
    randomly_generated_data_list = [[names.get_full_name()]+ list(np.random.permutation(ranking_list)) + [round(2*random.random(), 2)+2] for i in range(550)]
    columns = ["Nama"] + faculty_and_jurusan[faculty] + ["Nilai Akhir"]
    randomly_generated_data = pd.DataFrame(data=randomly_generated_data_list, columns=columns)
    # print(randomly_generated_data)
    randomly_generated_data.to_csv(f"dataGenerator/rawData/{faculty}.csv")



