import pandas as pd

# data = pd.read_csv("data-STEI.csv")
# print(data)

def printk():
    print("Bruh")

# Hasilkan data minat untuk masing-masing jurusan
def data_minatDF(data):
    jurusan_peminat_list = []

    for name, values in data.loc[:, "Informatika": "Teknik Biomedis"].iteritems():
        jurusan_peminat_baris = [name] + list(data[name].value_counts().sort_index())
        jurusan_peminat_list.append(jurusan_peminat_baris)

    # print(jurusan_peminat_list)

    jurusan_peminat = pd.DataFrame(data=jurusan_peminat_list, columns=["Nama Jurusan", "1", "2", "3", "4", "5", "6"])
    return jurusan_peminat

def data_minat(data):

    jurusan_peminat_list = []
    for name, values in data.loc[:, "Informatika": "Teknik Biomedis"].iteritems():
        jurusan_peminat_baris = [name] + list(data[name].value_counts().sort_index())
        jurusan_peminat_list.append(jurusan_peminat_baris)


    result = pd.DataFrame(data=jurusan_peminat_list, columns=["Nama Jurusan", "1", "2", "3", "4", "5", "6"]).set_index("Nama Jurusan").to_dict()
    return result

#Hasilkan data minat dan indeks akhir
def data_jurusan_dan_indeksDF(data, peringkat_minat):

    kamus_nilai = {
        "A" : 4.0,
        "AB": 3.5,
        "B" : 3.0,
        "BC" : 2.5,
        "C" : 2.0,
        "D" : 1.0,
        "E" : 0.0,
    }

    jurusan_dan_indeks_list = []

    for name, values in data.loc[:, "Informatika": "Teknik Biomedis"].iteritems():
        indeks_list = data.loc[data[name] == peringkat_minat]["Indeks Akhir"].apply(lambda index: kamus_nilai[index])
        rata_rata_indeks = indeks_list.sum()/len(indeks_list)
        jurusan_dan_indeks_baris = [name] + [rata_rata_indeks]
        jurusan_dan_indeks_list.append(jurusan_dan_indeks_baris)

    # print(jurusan_dan_indeks_list)
    jurusan_dan_indeks = pd.DataFrame(data=jurusan_dan_indeks_list, columns=["Nama Jurusan", f"Indeks Rata-Rata Peminat Nomor {peringkat_minat}"])
    return jurusan_dan_indeks

def data_jurusan_dan_indeks(data, peringkat_minat):

    kamus_nilai = {
        "A" : 4.0,
        "AB": 3.5,
        "B" : 3.0,
        "BC" : 2.5,
        "C" : 2.0,
        "D" : 1.0,
        "E" : 0.0,
    }

    result = {}

    for name, values in data.loc[:, "Informatika": "Teknik Biomedis"].iteritems():
        indeks_list = data.loc[data[name] == peringkat_minat]["Indeks Akhir"].apply(lambda index: kamus_nilai[index])
        rata_rata_indeks = indeks_list.sum()/len(indeks_list)
        result[name] = rata_rata_indeks

    # print(jurusan_dan_indeks_list)
    return result

def data_jurusan_dan_indeks_total (data):
    result = {}
    for i in range(1, 6):
        result[str(i)] = data_jurusan_dan_indeks(data, i)
    return result

# print(list(data_minat(pd.read_csv("dataGenerator/rawData/STEI.csv"))["Nama Jurusan"]))
# print(data_minat(pd.read_csv("dataGenerator/rawData/STEI.csv")))
# print(jurusan_dan_indeks(1))

# data_minat().set_index("Nama Jurusan").to_json(path_or_buf="./src/data/JSON/STEI-Peminat.json", orient="columns")
# jurusan_dan_indeks(1).set_index("Nama Jurusan").to_json(path_or_buf="./src/data/JSON/STEI-Indeks-Peminat.json", orient="columns")



