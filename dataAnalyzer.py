import pandas as pd

data = pd.read_csv("data-STEI.csv")
# print(data)


# Hasilkan data minat untuk masing-masing jurusan
def data_minat():
    jurusan_peminat_list = []

    for name, values in data.loc[:, "Informatika": "Teknik Biomedis"].iteritems():
        jurusan_peminat_baris = [name] + list(data[name].value_counts().sort_index())
        jurusan_peminat_list.append(jurusan_peminat_baris)

    # print(jurusan_peminat_list)

    jurusan_peminat = pd.DataFrame(data=jurusan_peminat_list, columns=["Nama Jurusan", "1", "2", "3", "4", "5", "6"])
    return jurusan_peminat

#Hasilkan data minat dan indeks akhir
def jurusan_dan_indeks(peringkat_minat):

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

print(data_minat())
print(jurusan_dan_indeks(1))

data_minat().set_index("Nama Jurusan").to_json(path_or_buf="./src/data/JSON/STEI-Peminat-Pertama.json", orient="columns")
jurusan_dan_indeks(1).set_index("Nama Jurusan").to_json(path_or_buf="indeks_peminat_pertama.json", orient="columns")



