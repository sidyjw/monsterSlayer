const app = new Vue({
    el: "#app",
    data: {
        playerHealth: 100,
        monsterHealth: 100,
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
        monsterAttack(){
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
            
            if(this.playerHealth > 100) 
                this.playerHealth = 100
            
                this.monsterAttack();
        },
        specialAttack(){
            this.playerDamage = _.random(1, 45);
            this.monsterHealth -= this.playerDamage;
            this.monsterAttack();
        },
        giveUp(){
            this.reset();
            alert('You give up!')
        },
        log(cl, msg, damage){
            if(this.playerDamage !== 0 || this.monsterDamage !== 0)
                this.logs.push({cl, msg: `${msg} ${damage}`})
        }
    },
    // computed: {
    //     playerTotalHealth(){
    //         return this.playerHealth -= this.monsterDamage;
    //     },
    //     monsterTotalHealth(){
    //         return this.monsterHealth -= this.playerDamage;
    //     }
    // },
    watch: {
        playerHealth() {
            if (this.playerHealth <= 0) {
                this.reset();
                alert('The monster wins!');
            }
        },
        playerDamage(){
            this.log('log__damage--player', 'PLAYER DAMAGE', this.playerDamage)
        },
        monsterHealth() {
            if (this.monsterHealth <= 0) {
                this.reset();
                return alert('You wins!');
            }
        },
        monsterDamage(){
            this.log('log__damage--monster', 'MONSTER DAMAGE', this.monsterDamage)
        }
    }
})