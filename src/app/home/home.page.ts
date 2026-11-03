import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton,
  IonButton, IonBadge, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
  IonCardContent, IonModal, IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonTextarea, IonText, IonButtons, IonFab, IonFabButton
} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonHeader, IonToolbar, IonTitle, IonContent,
    IonSegment, IonSegmentButton, IonButton, IonBadge, IonCard, IonCardHeader,
    IonCardTitle, IonCardSubtitle, IonCardContent, IonModal, IonItem, IonLabel,
    IonInput, IonSelect, IonSelectOption, IonTextarea, IonText, IonButtons,
    IonFab, IonFabButton
  ],
})
export class HomePage implements OnInit {
  whatsappNumber: string = '573001234567';
  categories: string[] = ['Todos', 'Hamburguesas', 'Combos', 'Acompañantes', 'Bebidas'];
  selectedCategory: string = 'Todos';
  orderType: 'domicilio' | 'llevar' = 'domicilio';
  cart: { product: any; quantity: number }[] = [];
  isCartOpen: boolean = false;

  customerName: string = '';
  customerPhone: string = '';
  customerAddress: string = '';
  customerNotes: string = '';
  paymentMethod: 'efectivo' | 'transferencia' = 'efectivo';
  formSubmitted: boolean = false;

  products = [
    { id: 1, category: 'Hamburguesas', name: 'Borgo Clásica', description: 'Carne 150g, queso cheddar, lechuga, tomate y salsa de la casa.', price: 18000, emoji: '🍔' },
    { id: 2, category: 'Hamburguesas', name: 'Borgo Tocineta', description: 'Carne 150g, doble tocineta ahumada, queso cheddar y cebolla caramelizada.', price: 22000, emoji: '🥓' },
    { id: 3, category: 'Hamburguesas', name: 'Borgo Doble Carne', description: 'Doble carne 300g, doble queso cheddar, salsa BBQ y aros de cebolla.', price: 28000, emoji: '🔥' },
    { id: 4, category: 'Hamburguesas', name: 'Borgo Champiñones', description: 'Carne 150g, champiñones salteados al ajillo y queso suizo.', price: 24000, emoji: '🍄' },
    { id: 5, category: 'Combos', name: 'Combo Clásico', description: 'Hamburguesa clásica + papas francesas + bebida (400ml).', price: 26000, emoji: '🍟' },
    { id: 6, category: 'Combos', name: 'Combo Tocineta', description: 'Hamburguesa tocineta + papas con cheddar + bebida (400ml).', price: 30000, emoji: '🥤' },
    { id: 7, category: 'Combos', name: 'Combo Familiar', description: '2 hamburguesas clásicas + 2 porciones de papas + 2 bebidas.', price: 48000, emoji: '👑' },
    { id: 8, category: 'Acompañantes', name: 'Papas Francesas', description: 'Porción personal de papas crujientes con salsa de la casa.', price: 8000, emoji: '🍟' },
    { id: 9, category: 'Acompañantes', name: 'Papas con Cheddar', description: 'Papas doradas bañadas en queso cheddar y trocitos de tocineta.', price: 14000, emoji: '🧀' },
    { id: 10, category: 'Acompañantes', name: 'Aros de Cebolla', description: '8 unidades de aros rebozados crujientes con salsa tártara.', price: 10000, emoji: '🧅' },
    { id: 11, category: 'Acompañantes', name: 'Dedos de Queso', description: '6 bastones de mozzarella empanizados con salsa agridulce.', price: 12000, emoji: '🧀' },
    { id: 12, category: 'Bebidas', name: 'Gaseosa 400ml', description: 'Coca-Cola, Manzana Postobón o Kolascandado.', price: 5000, emoji: '🥤' },
    { id: 13, category: 'Bebidas', name: 'Té Hielo Limón', description: 'Té natural frío sabor a limón 500ml.', price: 6000, emoji: '🧊' },
    { id: 14, category: 'Bebidas', name: 'Cerveza Nacional', description: 'Club Colombia o Águila 330ml.', price: 7000, emoji: '🍺' },
    { id: 15, category: 'Bebidas', name: 'Jugo Natural', description: 'Maracuyá, Mango o Lulo en agua.', price: 6500, emoji: '🧃' }
  ];

  constructor() {}

  ngOnInit() {
    this.loadCart();
  }

  get filteredProducts() {
    if (this.selectedCategory === 'Todos') return this.products;
    return this.products.filter(p => p.category === this.selectedCategory);
  }

  setOrderType(type: 'domicilio' | 'llevar') {
    this.orderType = type;
  }

  addToCart(product: any) {
    const existing = this.cart.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.saveCart();
  }

  increaseQty(item: any) {
    item.quantity++;
    this.saveCart();
  }

  decreaseQty(item: any) {
    item.quantity--;
    if (item.quantity <= 0) {
      this.removeFromCart(item);
    } else {
      this.saveCart();
    }
  }

  removeFromCart(item: any) {
    this.cart = this.cart.filter(i => i.product.id !== item.product.id);
    this.saveCart();
  }

  saveCart() {
    localStorage.setItem('borgo_cart', JSON.stringify(this.cart));
  }

  loadCart() {
    const saved = localStorage.getItem('borgo_cart');
    if (saved) {
      try { this.cart = JSON.parse(saved); } catch (e) { this.cart = []; }
    }
  }

  getTotalItems(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  }

  getShipping(): number {
    return this.orderType === 'domicilio' ? 3000 : 0;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getShipping();
  }

  formatPrice(value: number): string {
    return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  setCartOpen(isOpen: boolean) {
    this.isCartOpen = isOpen;
    if (isOpen) this.formSubmitted = false;
  }

  confirmOrder() {
    this.formSubmitted = true;
    if (!this.customerName.trim() || !this.customerPhone.trim()) return;
    if (this.orderType === 'domicilio' && !this.customerAddress.trim()) return;
    if (this.cart.length === 0) return;

    let message = `🍔 *PEDIDO NUEVO - BORGO* 🍔\n\n`;
    message += `👤 *Cliente:* ${this.customerName}\n`;
    message += `📞 *Teléfono:* ${this.customerPhone}\n`;
    message += `🛵 *Tipo:* ${this.orderType === 'domicilio' ? 'A domicilio' : 'Para llevar'}\n`;
    if (this.orderType === 'domicilio') message += `📍 *Dirección:* ${this.customerAddress}\n`;
    message += `💳 *Pago:* ${this.paymentMethod === 'efectivo' ? 'Efectivo' : 'Transferencia'}\n`;
    if (this.customerNotes.trim()) message += `💬 *Notas:* ${this.customerNotes}\n`;

    message += `\n🛒 *DETALLE:*\n`;
    this.cart.forEach(item => {
      message += `• ${item.quantity}x ${item.product.name} (${this.formatPrice(item.product.price * item.quantity)})\n`;
    });

    message += `\nSubtotal: ${this.formatPrice(this.getSubtotal())}\n`;
    if (this.orderType === 'domicilio') message += `🚚 Envío: ${this.formatPrice(3000)}\n`;
    message += `💰 *TOTAL: ${this.formatPrice(this.getTotal())}*\n\n¡Gracias por tu compra en Borgo! 🔥`;

    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_system');

    this.isCartOpen = false;
    this.cart = [];
    this.saveCart();
    this.formSubmitted = false;
    this.customerName = '';
    this.customerPhone = '';
    this.customerAddress = '';
    this.customerNotes = '';
  }
}
