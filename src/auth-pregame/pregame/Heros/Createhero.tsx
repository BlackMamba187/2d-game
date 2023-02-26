import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import square from "../../../assets/ui/square.png";
import button from "../../../assets/ui/button.png";

import { FaMinus, FaPlus } from "react-icons/fa";
import { auth, db } from "../../../firebase/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const feats = [
	{ name: "Super Strength", des: "Ability to lift and carry heavy objects" },
	{ name: "Super Speed", des: "Ability to move at incredible speeds" },
	{ name: "Invisibility", des: "Ability to become invisible" },
	{
		name: "Teleportation",
		des: "Ability to teleport from one location to another",
	},
];
const traits = [
	{ name: "Charismatic", des: "Ability to charm and persuade others" },
	{ name: "Stealthy", des: "Ability to move quietly and remain unseen" },
	{
		name: "Perceptive",
		des: "Ability to perceive and notice details in the environment",
	},
	{ name: "Tough", des: "Ability to withstand pain and injury" },
];

const spells = [
	{ name: "Fireball", des: "Ability to shoot a ball of fire at a target" },
	{ name: "Telekinesis", des: "Ability to move objects with the mind" },
	{ name: "Invisibility", des: "Ability to become invisible" },
	{ name: "Healing", des: "Ability to heal oneself or others" },
];

const skills = [
	{ name: "Archery", des: "Ability to use a bow and arrow" },
	{
		name: "Blacksmithing",
		des: "Ability to make and repair weapons and armor",
	},
	{ name: "Lockpicking", des: "Ability to open locks without a key" },
	{ name: "Survival", des: "Ability to survive in the wild" },
];

const Createhero = () => {
	const [tabs, setTabs] = useState(1);

	const [strength, setStrength] = useState(10);
	const [dexterity, setDexterity] = useState(10);
	const [constitution, setConstitution] = useState(10);
	const [intelligence, setIntelligence] = useState(10);
	const [wisdom, setWisdom] = useState(10);
	const [charisma, setCharisma] = useState(10);

	const [heroName, setHeroName] = useState("");
	const [heroClass, setHeroClass] = useState("");
	const [heroAlignment, setHeroAlignment] = useState("");

	const [heroFeats, setHeroFeats] = useState<{ name: string; des: string }[]>(
		[]
	);
	const [heroTraits, setHeroTraits] = useState<{ name: string; des: string }[]>(
		[]
	);
	const [heroSpells, setHeroSpells] = useState<{ name: string; des: string }[]>(
		[]
	);
	const [heroSkills, setHeroSkills] = useState<{ name: string; des: string }[]>(
		[]
	);

	const navigate = useNavigate();
	let total =
		strength + dexterity + constitution + intelligence + wisdom + charisma;

	const setStrengthValue = (value: number) => {
		if (total + value - strength <= 85 && value > 3) {
			setStrength(value);
		} else {
			return;
		}
	};
	const setDexterityValue = (value: number) => {
		if (total + value - dexterity <= 85 && value > 3) {
			setDexterity(value);
		} else {
			return;
		}
	};
	const setConstitutionValue = (value: number) => {
		if (total + value - constitution <= 85 && value > 3) {
			setConstitution(value);
		} else {
			return;
		}
	};
	const setIntelligenceValue = (value: number) => {
		if (total + value - intelligence <= 85 && value > 3) {
			setIntelligence(value);
		} else {
			return;
		}
	};
	const setWisdomValue = (value: number) => {
		if (total + value - wisdom <= 85 && value > 3) {
			setWisdom(value);
		} else {
			return;
		}
	};
	const setCharismaValue = (value: number) => {
		if (total + value - charisma <= 85 && value > 3) {
			setCharisma(value);
		} else {
			return;
		}
	};

	const reset = () => {
		setStrength(10);
		setDexterity(10);
		setConstitution(10);
		setIntelligence(10);
		setWisdom(10);
		setCharisma(10);
	};

	const setTabValue = (value: number) => {
		if (value >= 1 && value <= 8) {
			setTabs(value);
		} else {
			return;
		}
	};

	const addHeroProp = (newProp: { name: any; des: string }, name: string) => {
		if (name === "feat") {
			const isFeatPresent = heroFeats.some(
				(feat) => feat.name === newProp.name
			);
			if (isFeatPresent) {
				setHeroFeats(heroFeats.filter((feat) => feat.name !== newProp.name));
				return;
			}
			if (heroFeats.length < 2) {
				setHeroFeats([...heroFeats, newProp]);
			} else {
				alert("You can only have 2 feats.");
			}
		}
		if (name === "trait") {
			const isTraitPresent = heroTraits.some(
				(trait) => trait.name === newProp.name
			);
			if (isTraitPresent) {
				setHeroTraits(
					heroTraits.filter((trait) => trait.name !== newProp.name)
				);
				return;
			}
			if (heroTraits.length < 2) {
				setHeroTraits([...heroTraits, newProp]);
			} else {
				alert("You can only have 2 traits.");
			}
		}
		if (name === "spell") {
			const isSpellPresent = heroSpells.some(
				(spell) => spell.name === newProp.name
			);
			if (isSpellPresent) {
				setHeroSpells(
					heroSpells.filter((spell) => spell.name !== newProp.name)
				);
				return;
			}
			if (heroSpells.length < 2) {
				setHeroSpells([...heroSpells, newProp]);
			} else {
				alert("You can only have 2 spells.");
			}
		}
		if (name === "skill") {
			const isSkillPresent = heroSkills.some(
				(skill) => skill.name === newProp.name
			);
			if (isSkillPresent) {
				setHeroSkills(
					heroSkills.filter((skill) => skill.name !== newProp.name)
				);
			}
			if (heroSkills.length < 2) {
				setHeroSkills([...heroSkills, newProp]);
			} else {
				alert("You can only have 2 skills.");
			}
		} else {
			return;
		}
	};

	const handleSubmit = async () => {
		const ID = auth.currentUser?.uid;
		if (!heroName || !heroClass || !heroAlignment) {
			alert("Name, class, and alignment are required fields.");
			return;
		} else if (total !== 85) {
			alert("you need jesus");
			return;
		} else if (heroFeats.length !== 2 || heroTraits.length !== 2 || heroSpells.length !== 2 || heroSkills.length !== 2) {
			alert("All arrays must contain exactly 2 objects.");
			return;
		}  else {
			try {
				await addDoc(collection(db, "heros"), {
					id: ID,
					name: heroName,
					class: heroClass,
					alignment: heroAlignment,
					str: strength,
					dex: dexterity,
					con: constitution,
					int: intelligence,
					wis: wisdom,
					cha: charisma,
					feats: heroFeats,
					traits: heroTraits,
					spells: heroSpells,
					skills: heroSkills,
				});

				navigate("/heros");
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div className="min-h-screen max-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://img.itch.zone/aW1hZ2UvMTQ1OTg5OS84NTIyMDY2LnBuZw==/original/6HnMxI.png')] overflow-y-auto scrollbar-none select-none">
			<Link className="z-50 h-8 absolute bg-sky-500" to={"/heros"}>
				Back
			</Link>
			<div className="p-10 min-h-screen max-h-screen flex justify-center">
				<div className="flex flex-col justify-around w-1/4">
					<div className="flex">
						<p className="w-1/2">Name:</p>
						<div className="w-1/2 flex flex-col items-center">
							<p> {heroName}</p>
						</div>
					</div>
					<div className="flex">
						<p className="w-1/2">Class:</p>
						<div className="w-1/2 flex flex-col items-center">
							<p> {heroClass}</p>
						</div>
					</div>
					<div className="flex">
						<p className="w-1/2">Alignment:</p>
						<div className="w-1/2 flex flex-col items-center">
							<p> {heroAlignment}</p>
						</div>
					</div>
					<div className="flex">
						<p className="colspan-2 w-1/2">Ability scores</p>
						<div className="grid grid-cols-2 w-1/2">
							<p className="place-self-center">STR: {strength}</p>{" "}
							<p className="place-self-center">DEX:{dexterity}</p>{" "}
							<p className="place-self-center">con: {constitution}</p>{" "}
							<p className="place-self-center">INT: {intelligence}</p>{" "}
							<p className="place-self-center">WIS: {wisdom}</p>{" "}
							<p className="place-self-center">CHA: {charisma}</p>
						</div>
					</div>
					<div className="flex">
						<p className="w-1/2">Feats:</p>

						<div className="w-1/2 flex flex-col items-center">
							{heroFeats.map((item) => {
								return <div className="">{item.name}</div>;
							})}
						</div>
					</div>
					<div className="flex">
						<p className="w-1/2">Traits:</p>

						<div className="w-1/2 flex flex-col items-center">
							{heroTraits.map((item) => {
								return <div className="">{item.name}</div>;
							})}
						</div>
					</div>
					<div className="flex">
						<p className="w-1/2">Spells:</p>

						<div className="w-1/2 flex flex-col items-center">
							{heroSpells.map((item) => {
								return <div className="">{item.name}</div>;
							})}
						</div>
					</div>
					<div className="flex">
						<p className="w-1/2">Skills:</p>
						<div className="w-1/2 flex flex-col items-center">
							{heroSkills.map((item) => {
								return <div className="">{item.name}</div>;
							})}
						</div>
					</div>
				</div>
				<div className="w-2/4 grid grid-cols-2">
					<div className="relative place-self-center col-span-2 h-full w-full p-8">
						<img src={square} className="h-full w-full" />
						<div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] overflow-y-auto scrollbar-none">
							{(() => {
								switch (tabs) {
									case 1:
										return (
											<div className="flex flex-col justify-center items-center">
												<p>Character Name</p>
												<input
													className="bg-[#ead4aa] border-2 border-[#743f39] outline-0"
													onChange={(e) => setHeroName(e.target.value)}
												/>
											</div>
										);
									case 2:
										return (
											<div className="flex flex-col justify-center items-center">
												<p>Class</p>
												<div className="grid grid-cols-2">
													<p
														onClick={() => setHeroClass("Warrior")}
														className="m-2 p-4"
													>
														Warrior
													</p>
													<p
														onClick={() => setHeroClass("Acolyte")}
														className="m-2 p-4"
													>
														Acolyte
													</p>
													<p
														onClick={() => setHeroClass("Mage")}
														className="m-2 p-4"
													>
														Mage
													</p>
													<p
														onClick={() => setHeroClass("Rogue")}
														className="m-2 p-4"
													>
														Rogue
													</p>
													<p
														onClick={() => setHeroClass("Ranger")}
														className="m-2 p-4"
													>
														Ranger
													</p>
												</div>
											</div>
										);
									case 3:
										return (
											<div className="flex flex-col justify-center items-center">
												<p>Alignment</p>
												<div className="grid grid-cols-3">
													<p
														onClick={() => setHeroAlignment("LG")}
														className="m-2 p-4 place-self-center"
													>
														LG
													</p>
													<p
														onClick={() => setHeroAlignment("LN")}
														className="m-2 p-4 place-self-center"
													>
														LN
													</p>
													<p
														onClick={() => setHeroAlignment("LE")}
														className="m-2 p-4 place-self-center"
													>
														LE
													</p>

													<p
														onClick={() => setHeroAlignment("NG")}
														className="m-2 p-4 place-self-center"
													>
														NG
													</p>
													<p
														onClick={() => setHeroAlignment("TN")}
														className="m-2 p-4 place-self-center"
													>
														T
													</p>
													<p
														onClick={() => setHeroAlignment("NE")}
														className="m-2 p-4 place-self-center"
													>
														NE
													</p>

													<p
														onClick={() => setHeroAlignment("CG")}
														className="m-2 p-4 place-self-center"
													>
														CG
													</p>
													<p
														onClick={() => setHeroAlignment("CN")}
														className="m-2 p-4 place-self-center"
													>
														CN
													</p>
													<p
														onClick={() => setHeroAlignment("CE")}
														className="m-2 p-4 place-self-center"
													>
														CE
													</p>
												</div>
											</div>
										);
									case 4:
										return (
											<div className="flex flex-col justify-center items-center">
												<p>
													Total points left: {85 - total}
													<div className="bg-sky-500" onClick={() => reset()}>
														Reset
													</div>
												</p>
												<div className="grid grid-cols-2 gap-4">
													<div className="flex flex-row items-center justify-around m-2">
														<FaMinus
															className="cursor-pointer h-full"
															onClick={() => setStrengthValue(strength - 1)}
														/>
														<div className="text-lg bg-[#ead4aa] mx-2">
															STR: {strength}
														</div>
														<FaPlus
															className="cursor-pointer h-full "
															onClick={() => setStrengthValue(strength + 1)}
														/>
													</div>
													<div className="flex flex-row items-center justify-around m-2">
														<FaMinus
															className="cursor-pointer h-full"
															onClick={() => setDexterityValue(dexterity - 1)}
														/>
														<div className="text-lg bg-[#ead4aa] mx-2">
															DEX: {dexterity}
														</div>
														<FaPlus
															className="cursor-pointer h-full"
															onClick={() => setDexterityValue(dexterity + 1)}
														/>
													</div>
													<div className="flex flex-row items-center justify-around m-2">
														<FaMinus
															className="cursor-pointer h-full"
															onClick={() =>
																setConstitutionValue(constitution - 1)
															}
														/>
														<div className="text-lg bg-[#ead4aa] mx-2">
															CON: {constitution}
														</div>
														<FaPlus
															className="cursor-pointer h-full"
															onClick={() =>
																setConstitutionValue(constitution + 1)
															}
														/>
													</div>
													<div className="flex flex-row items-center justify-around m-2">
														<FaMinus
															className="cursor-pointer h-full"
															onClick={() =>
																setIntelligenceValue(intelligence - 1)
															}
														/>
														<div className="text-lg bg-[#ead4aa] mx-2">
															INT: {intelligence}
														</div>
														<FaPlus
															className="cursor-pointer h-full"
															onClick={() =>
																setIntelligenceValue(intelligence + 1)
															}
														/>
													</div>
													<div className="flex flex-row items-center justify-around m-2">
														<FaMinus
															className="cursor-pointer h-full"
															onClick={() => setWisdomValue(wisdom - 1)}
														/>
														<div className="text-lg bg-[#ead4aa] mx-2">
															WIS: {wisdom}
														</div>
														<FaPlus
															className="cursor-pointer h-full ml-2"
															onClick={() => setWisdomValue(wisdom + 1)}
														/>
													</div>
													<div className="flex flex-row items-center justify-around m-2">
														<FaMinus
															className="cursor-pointer h-full"
															onClick={() => setCharismaValue(charisma - 1)}
														/>
														<div className="text-lg bg-[#ead4aa] mx-2">
															CHA: {charisma}
														</div>
														<FaPlus
															className="cursor-pointer h-full ml-2"
															onClick={() => setCharismaValue(charisma + 1)}
														/>
													</div>
												</div>
											</div>
										);
									case 5:
										return (
											<div className="flex flex-col justify-center items-center">
												<p className="my-2">Feats</p>
												<div className="grid grid-cols-2 h-full w-full gap-y-4">
													{feats.map((feat, index) => (
														<div
															key={index}
															className="group h-20 text-center"
															onClick={() => addHeroProp(feat, "feat")}
														>
															<p className="r">{feat.name}</p>
															<p className="hidden group-hover:block p-2">
																{feat.des}
															</p>
														</div>
													))}
												</div>
											</div>
										);
									case 6:
										return (
											<div className="flex flex-col justify-center items-center">
												<p className="my-2">Traits</p>
												<div className="grid grid-cols-2 h-full w-full gap-y-4">
													{traits.map((trait, index) => (
														<div
															key={index}
															className="group h-20 text-center"
															onClick={() => addHeroProp(trait, "trait")}
														>
															<p className="r">{trait.name}</p>
															<p className="hidden group-hover:block p-2">
																{trait.des}
															</p>
														</div>
													))}
												</div>
											</div>
										);
									case 7:
										return (
											<div className="flex flex-col justify-center items-center">
												<p className="my-2">Spells</p>
												<div className="grid grid-cols-2 h-full w-full gap-y-4">
													{spells.map((spell, index) => (
														<div
															key={index}
															className="group h-20 text-center"
															onClick={() => addHeroProp(spell, "spell")}
														>
															<p className="r">{spell.name}</p>
															<p className="hidden group-hover:block p-2">
																{spell.des}
															</p>
														</div>
													))}
												</div>
											</div>
										);
									case 8:
										return (
											<div className="flex flex-col justify-center items-center">
												<p className="my-2">Skills</p>
												<div className="grid grid-cols-2 h-full w-full gap-y-4">
													{skills.map((skill, index) => (
														<div
															key={index}
															className="group h-20 text-center"
															onClick={() => addHeroProp(skill, "skill")}
														>
															<p className="">{skill.name}</p>
															<p className="hidden group-hover:block p-2">
																{skill.des}
															</p>
														</div>
													))}
												</div>
											</div>
										);
								}
							})()}
						</div>
					</div>
					<div
						onClick={() => setTabValue(tabs - 1)}
						className="place-self-center bg-[#ead4aa]"
					>
						Back
					</div>
					<div
						onClick={() => setTabValue(tabs + 1)}
						className="place-self-center bg-[#ead4aa]"
					>
						Next
					</div>
					<div
						className="bg-sky-500 col-span-2 my-2 flex justify-center items-center"
						onClick={() => handleSubmit()}
					>
						save me
					</div>
				</div>
			</div>
		</div>
	);
};

export default Createhero;
