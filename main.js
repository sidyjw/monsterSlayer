const app = new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        playerHealthBarColor: '#86e01e',
        monsterHealth: 100,
        monsterHealthBarColor: '#86e01e',
        isStarted: false,
        playerDamage: 0,
        monsterDamage: 0,
        logs: [],
    },
    methods: {
        reset() {
            this.monsterDamage = 0;
            this.playerDamage = 0;
            this.isStarted = false;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.logs = [];
        },
        monsterAttack() {
            this.monsterDamage = _.random(1, 25);
            this.playerHealth -= this.monsterDamage;
        },
        attack() {
            this.playerDamage = _.random(1, 15);
            this.monsterHealth -= this.playerDamage;
            this.monsterAttack()
        },
        heal() {
            this.playerHealth += _.random(1, 40);

            if (this.playerHealth > 100)
                this.playerHealth = 100

            this.monsterAttack();
        },
        specialAttack() {
            this.playerDamage = _.random(1, 45);
            this.monsterHealth -= this.playerDamage;
            this.monsterAttack();
        },
        giveUp() {
            this.reset();
            alert('You give up!')
        },
        log(cl, msg, damage) {
            if (this.playerDamage !== 0 || this.monsterDamage !== 0)
                this.logs.unshift({
                    cl,
                    msg: `${msg} ${damage}`
                })
        }
    },
    computed: {
        playerHealthBar(){
            return {
                width: this.playerHealth + '%',
                backgroundColor: this.playerHealthBarColor
            }
        },
        monsterHealthBar(){
            return {
                width: this.monsterHealth + '%',
                backgroundColor: this.monsterHealthBarColor
            }
        }
    },
    watch: {
        playerHealth() {
            if (this.playerHealth <= 0) {
                this.reset();
                alert('The monster wins!');
            }
            if (this.playerHealth <= 100 && this.playerHealth > 75)
                    return this.playerHealthBarColor = '#86e01e';
            if (this.playerHealth <= 75 && this.playerHealth > 50)
                    return this.playerHealthBarColor = '#f2d31b';
            if (this.playerHealth <= 50 && this.playerHealth > 25)
                    return this.playerHealthBarColor = '#f2b01e';
            if (this.playerHealth <= 25)
                    return this.playerHealthBarColor = '#f63a0f';
        },
        playerDamage() {
            this.log('log__damage--player', 'PLAYER DAMAGE', this.playerDamage)
        },
        monsterHealth() {
            if (this.monsterHealth <= 0) {
                this.reset();
                return alert('You wins!');
            }
            if (this.monsterHealth <= 100 && this.monsterHealth > 75)
                    return this.monsterHealthBarColor = '#86e01e';
            if (this.monsterHealth <= 75 && this.monsterHealth > 50)
                    return this.monsterHealthBarColor = '#f2d31b';
            if (this.monsterHealth <= 50 && this.monsterHealth > 25)
                    return this.monsterHealthBarColor = '#f2b01e';
            if (this.monsterHealth <= 25)
                    return this.monsterHealthBarColor = '#f63a0f';
        },
        monsterDamage() {
            this.log('log__damage--monster', 'MONSTER DAMAGE', this.monsterDamage)
        }
    }
})