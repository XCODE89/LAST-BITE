export const finishOrder = (cartItems, clientInfo, setClientInfo, setShowForm, setCartItems) => {
    console.log("hola", cartItems)
    const phoneNumber = "56950982932"; // tu número de WhatsApp, con código país sin "+"
    
    const orderDetails = cartItems.map(item =>
        `•🍰 ${item.name} x${item.quantity}`
    ).join("\n");

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const message = `
¡Hola! 🧁

Quiero hacer un pedido en *SWEET YOU*:

${orderDetails}

🧾 Total: $${total.toFixed(2)}
📍 Dirección: ${clientInfo.address}
📅 Para: ${clientInfo.date}
👤 Cliente: ${clientInfo.clientName}

¿Me ayudan a confirmar disponibilidad y coordinar el envío? ¡Gracias!? 💖`;

  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message.trim())}`;
    window.open(url, "_blank");

    setClientInfo({
        clientName: "",
        address: "",
        date: "",

    })
    setShowForm(false)
    setCartItems([])
};
