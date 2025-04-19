# 生成所有可能的华盛顿州电话号码并保存为TXT文件

file_path = "D:\jv\washington_all_phone_numbers.txt"

with open(file_path, "w") as file:
    for area_code in area_codes:
        for prefix in range(200, 1000):  # 避免前缀从0开始
            for line_number in range(1000, 10000):
                phone_number = f"{area_code}{prefix}{line_number}\n"
                file.write(phone_number)

file_path