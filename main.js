new Vue({ 
    el: "#app",
    data:{
        playerHealth: 100,
        monsterHealth: 100,
        isStarted: false,
        playerDamage: 0,
        monsterDamage: 0,
    },
    methods: {
        attack(){
            this.playerDamage = _.random(1, 15);
            this.monsterDamage = _.random(1, 25);
        },
        heal(){
            this.playerTotalHealth += _.random(1, 30);
            this.monsterDamage = _.random(1, 25);
        }
    },
    computed: {
        playerTotalHealth(){
            return this.playerHealth -= this.monsterDamage;
        },
        monsterTotalHealth(){
            return this.monsterHealth -= this.playerDamage;
        }
    },
    watch: {
        playerTotalHealth(){
            if(this.playerTotalHealth <= 0){
                this.isStarted = false;
                this.playerHealth = 100;
                this.monsterHealth = 100;
                alert('The monster wins!');
            }
        },
        monsterTotalHealth(){
            if(this.monsterTotalHealth <= 0){
                this.isStarted = false;
                this.playerHealth = 100;
                this.monsterHealth = 100;
                alert('You wins!');
            }
        }
    }
})