import pandas as pd
import names
import random
import numpy as np

nilai_list = ["A", "AB", "B", "BC", "C", "D", "E"]
ranking_list = [i for i in range(1, 7)]

randomly_generated_data_list = [[names.get_full_name()]+ list(np.random.permutation(ranking_list)) +[nilai_list[random.randrange(7)]] for i in range(100)]

# print(randomly_generated_data_list)

randomly_generated_data = pd.DataFrame(data=randomly_generated_data_list, columns=["Nama", "Informatika", "Sistem Teknologi Informasi", "Teknik Elektro", "Teknik Tenaga Listrik", "Teknik Telekomunikasi", "Teknik Biomedis", "Indeks Akhir"])
print(randomly_generated_data)
randomly_generated_data.to_csv("data-STEI.csv")

