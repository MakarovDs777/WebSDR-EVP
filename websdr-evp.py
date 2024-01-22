from selenium import webdriver
from selenium.webdriver.common.keys import Keys 
from selenium.webdriver.common.by import By 
import time
import random

# Создание объекта драйвера браузера
driver = webdriver.Chrome()

# URL веб-интерфейса радиосканера
url = 'http://websdr.ewi.utwente.nl:8901'

try:
    # Открытие веб-интерфейса
    driver.get(url)

    while True:
        # Получение элемента ввода kHz на странице
        frequency_input = driver.find_element(By.NAME, 'frequency')

        # Генерация случайной частоты в пределах диапазона
        frequency = str(random.randint(1000, 30000))

        # Очистка поля ввода и установка новой частоты
        frequency_input.clear()
        frequency_input.send_keys(frequency)
        # Ожидание 3 секунд
        time.sleep(3)

        # Нажатие клавиши Enter для применения новой частоты
        frequency_input.send_keys(Keys.RETURN)

except Exception as e:
    print(e)
finally:
    # Закрытие браузера после завершения
    driver.quit()