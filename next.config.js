module.exports = {
	async redirects() {
		return [
			{
				source: "/discord",
				destination: "https://discord.gg/yDCsygY",
				permanent: true,
			},
			{
				source: "/github",
				destination: "https://github.com/OE-O",
				permanent: true,
			},
			{
				source: "/learn",
				destination: "https://tutorials.oe-o.dev/",
				permanent: true,
			},
		];
	},
};
