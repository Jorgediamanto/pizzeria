# Lista de números
numeros = [2, 3, 1, 5]

# Número máximo de intentos
intentos_maximos = 4

# Bucle para recibir input del usuario hasta que se agoten los intentos
for intento in range(intentos_maximos):
    # Solicitar al usuario que ingrese un número
    entrada_usuario = input(f"Intento {intento + 1}/{intentos_maximos}: Ingresa el número en la posición {intento + 1}: ")

    # Intentar convertir la entrada del usuario a un número entero
    try:
        numero_ingresado = int(entrada_usuario)
    except ValueError:
        print("Por favor, ingresa un número válido.")
        continue

    # Verificar si el número ingresado coincide con el número en la posición correspondiente
    if numero_ingresado == numeros[intento]:
        print("¡Acertaste!")
    else:
        print("Número incorrecto.")

# Mensaje final después de agotar los intentos
print("Fin del juego. Gracias por participar.")
