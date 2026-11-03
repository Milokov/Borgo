# 🍔 Borgo - App de Pedidos

**Borgo** es una aplicación móvil moderna desarrollada con **Ionic + Angular (Standalone)** y **Capacitor**, diseñada específicamente para la hamburguesería artesanal **Borgo**. La aplicación ofrece una experiencia de usuario rápida, intuitiva y optimizada para dispositivos móviles (Android), permitiendo a los clientes explorar el menú, armar su pedido y enviarlo directamente a través de **WhatsApp**.

---

## 🚀 Funcionalidades Principales

1. **Selección de Tipo de Pedido**:
   - Inicio interactivo con botones para elegir entre **"A domicilio"** (agrega un costo de envío fijo de `$3.000`) o **"Para llevar"**. El tipo seleccionado se mantiene sincronizado en todo el proceso de compra.

2. **Menú Dinámico por Categorías**:
   - Filtro rápido mediante `ion-segment` con 4 categorías principales:
     - 🍔 **Hamburguesas** (Clásica, Tocineta, Doble Carne, Champiñones).
     - 🍟 **Combos** (Clásico, Tocineta, Familiar).
     - 🧀 **Acompañantes** (Papas francesas, Papas con cheddar y tocineta, Aros de cebolla, Dedos de queso).
     - 🥤 **Bebidas** (Gaseosa, Té helado, Cerveza, Jugo natural).
   - Tarjetas (`ion-card`) con emojis descriptivos, nombres, descripciones detalladas, precios en pesos colombianos formateados (ej. `$18.000`) y botón rápido de adición.

3. **Carrito de Compras y Modal Interactivo**:
   - Botón superior y botón flotante (`ion-fab`) con contador en tiempo real (`ion-badge`).
   - Modal completo (`ion-modal`) que detalla los productos seleccionados, permitiendo incrementar (`+`), decrementar (`-`) o eliminar artículos.
   - Cálculo automático de subtotal, costo de envío y total general.
   - Mensaje amigable cuando el carrito está vacío.
   - **Persistencia local**: El carrito se guarda automáticamente en `localStorage` para no perder la selección al cerrar la app o recargar.

4. **Formulario de Checkout y Validación**:
   - Captura de datos del cliente: Nombre, Teléfono, Tipo de pedido, Dirección de entrega (visible y obligatoria únicamente para pedidos a domicilio), Método de pago (**Efectivo** o **Transferencia Nequi/Daviplata**) y campo de observaciones opcional.
   - Validación de campos obligatorios con mensajes de alerta claros.

5. **Integración con WhatsApp**:
   - Al confirmar el pedido, la app genera un mensaje formateado y estructurado con todos los datos del cliente, productos, cantidades, subtotales, tipo de servicio y total a pagar.
   - Utiliza `encodeURIComponent` y abre WhatsApp de manera nativa mediante `window.open(url, '_system')`.

---

## 🛠️ Tecnologías Utilizadas

- **Ionic Framework** (`^9.0.0`)
- **Angular Standalone Components** (`^22.2.3`)
- **Capacitor** (`^8.6.0`) para la integración nativa con Android.
- **TypeScript** y **SASS/CSS** (con diseño Mobile-First y sombras suaves).

---

## ⚙️ Comandos de Desarrollo y Sincronización

Para compilar la aplicación web y sincronizar los cambios con la plataforma nativa de Android, ejecuta en la raíz del proyecto:

```bash
ionic build
npx cap sync android
```

---

## 📱 Cómo Ejecutar y Probar

1. **Compilar y sincronizar**:
   ```bash
   npm run build
   npx cap sync android
   ```
2. **Abrir en Android Studio**:
   ```bash
   npx cap open android
   ```
3. Selecciona tu emulador o dispositivo físico Android y haz clic en **Run (▶)**.

---

## 📂 Archivos Clave Modificados
- [src/app/home/home.page.html](file:///C:/Users/milox/appNativa/src/app/home/home.page.html): Estructura visual de la tienda, menú, carrito flotante y modal de checkout.
- [src/app/home/home.page.ts](file:///C:/Users/milox/appNativa/src/app/home/home.page.ts): Lógica de negocio, gestión del carrito, almacenamiento local, filtrado de categorías y generación de URL de WhatsApp.
- [src/app/home/home.page.scss](file:///C:/Users/milox/appNativa/src/app/home/home.page.scss): Estilos específicos de la página de inicio.
- [src/global.scss](file:///C:/Users/milox/appNativa/src/global.scss): Estilos globales y paleta de colores de Borgo.
