
VOTE_COOLDOWN = 10*1000 //in miliseconds

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}