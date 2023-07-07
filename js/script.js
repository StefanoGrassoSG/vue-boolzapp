const { createApp } = Vue;

createApp({
    data() {
        return {
            contacts: [
                {
                name: 'Sofia',
                avatar: './img/avatar_io.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto!',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Fabio',
                avatar: './img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                    date: '2020/03/20 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                    },
                    {
                    date: '2020/03/20 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                    },
                    {
                    date: '2020/03/20 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                    }
                ],
                },
                {
                name: 'Samuele',
                avatar: './img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                    date: '2020/03/28 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                    },
                    {
                    date: '2020/03/28 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                    },
                    {
                    date: '2020/03/28 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Alessandro B.',
                avatar: './img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Alessandro L.',
                avatar: './img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Claudia',
                avatar: './img/avatar_6.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                    },
                    {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent'
                    }
                ],
                },
                {
                name: 'Federico',
                avatar: './img/avatar_7.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
                    }
                ],
                },
                {
                name: 'Davide',
                avatar: './img/avatar_8.jpg',
                visible: true,
                messages: [
                    {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao, andiamo a mangiare la pizza stasera?',
                    status: 'received'
                    },
                    {
                    date: '10/01/2020 15:50:00',
                    message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                    status: 'sent'
                    },
                    {
                    date: '10/01/2020 15:51:00',
                    message: 'OK!!',
                    status: 'received'
                    }
                ],
                }
                ],
                activeIndex: null,
                activeUser: null,
                newMess: '',
                searchUser: '',
                showMenu: false
        }
    },
    methods: {
        active(index) {
            const filteredContacts = this.filterContacts(); 
            const originalIndex = this.contacts.indexOf(filteredContacts[index]);
          
            this.activeIndex = originalIndex;
            this.activeUser = this.contacts[originalIndex];
        },

        isActiveContact(contact) {
            return contact === this.activeUser;
        },
          
        messageStyle(message) {
            return message.status === 'received' ? 'left-mess' : 'right-mess';
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },

        newMessage() {
            if (this.newMess != '') {
              const newMessage = {
                date: new Date().toLocaleString(),
                message: this.newMess,
                status: 'sent'
              };
          
              this.activeUser.messages.push(newMessage);
              this.newMess = ''; 
            }

            this.sendResponse();
        },

        sendResponse() {
            setTimeout(() => {
                const response = {
                    date: new Date().toLocaleString(),
                    message: 'ok',
                    status: 'received'
                };

                this.activeUser.messages.push(response)
            }, 1000)
        },

        filterContacts() {
            const searchValue = this.searchUser.toLowerCase();
            return this.contacts.filter(function(contact) {
                return contact.name.toLowerCase().includes(searchValue);
              });
        },
          
        openMenu(message) {
            this.activeUser.messages.forEach((msg) => {
              msg.showMenu = false;
            });
          
            message.showMenu = true;
        },

        deleteMessage(message) {
            const index = this.activeUser.messages.indexOf(message);
            if (index > -1) {
              this.activeUser.messages.splice(index, 1);
            }
        }
          
    }
}).mount('#app')