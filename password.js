var crypto = require('crypto');

var genSalt = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex')
            .slice(0,length);
};

module.exports = {
	
	create: function(password, salt_sz){
		if (typeof salt_sz != 'number')
			salt_sz = 16;
		
		var salt = genSalt(salt_sz);
		var hash = crypto.createHmac('sha512', salt);
		hash.update(password);
		
		return {
			salt: salt,
			hash: hash.digest('hex')
		};
	},
	
	check: function(password, password_hash, salt) {	
		var hash = crypto.createHmac('sha512', salt);
		hash.update(password);
		var phash = hash.digest('hex');
		
		return phash == password_hash;
	}
	
}