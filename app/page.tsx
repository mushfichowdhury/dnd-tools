'use client';

import { useMemo, useState } from 'react';

type MonsterRole = 'Leader' | 'General' | 'Knight' | 'Pawn';

type Monster = {
  name: string;
  cr: number;
  role: MonsterRole;
  terrains: string[];
  themes: string[];
  image: string;
  source: string;
};

type HordeSelection = {
  leader: string;
  terrain: string;
  generals: number;
  knights: number;
  pawns: number;
};

type HordeGroup = {
  title: string;
  description: string;
  monsters: Monster[];
};

const TERRAIN_OPTIONS = [
  'Arctic',
  'Coastal',
  'Desert',
  'Forest',
  'Grassland',
  'Mountain',
  'Swamp',
  'Underdark',
  'Urban',
  'Volcanic'
];

const MONSTERS: Monster[] = [
  {
    name: 'Ancient Black Dragon',
    cr: 21,
    role: 'Leader',
    terrains: ['Swamp', 'Coastal'],
    themes: ['dragon', 'acid', 'tyranny'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/6/280/315/636252762635640751.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Lich',
    cr: 21,
    role: 'Leader',
    terrains: ['Urban', 'Underdark', 'Forest'],
    themes: ['undead', 'necromancy', 'arcane'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/43/280/315/636252762712251078.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Beholder',
    cr: 13,
    role: 'Leader',
    terrains: ['Underdark', 'Urban'],
    themes: ['aberration', 'tyrant'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/15/280/315/636252762642535978.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Drow Matron Mother',
    cr: 20,
    role: 'Leader',
    terrains: ['Underdark'],
    themes: ['drow', 'cult', 'shadow'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/30735/956/280/315/638040557965574611.png',
    source: 'Mordenkainen Presents: Monsters of the Multiverse'
  },
  {
    name: 'Mind Flayer Arcanist',
    cr: 8,
    role: 'Leader',
    terrains: ['Underdark', 'Urban'],
    themes: ['aberration', 'psionics'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/125/280/315/636252762828745249.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Fire Giant Dreadnought',
    cr: 14,
    role: 'Leader',
    terrains: ['Mountain', 'Volcanic'],
    themes: ['giant', 'fire', 'war'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/30835/97/280/315/638063877516876355.png',
    source: 'Volo\'s Guide to Monsters'
  },
  {
    name: 'Death Knight',
    cr: 17,
    role: 'General',
    terrains: ['Urban', 'Forest', 'Grassland'],
    themes: ['undead', 'holy', 'war'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/56/280/315/636252762736657951.jpeg',
    source: 'Dungeon Master\'s Guide'
  },
  {
    name: 'Drow Elite Warrior',
    cr: 5,
    role: 'General',
    terrains: ['Underdark', 'Forest'],
    themes: ['drow', 'shadow'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/263/280/315/636252763190492989.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Hobgoblin Warlord',
    cr: 6,
    role: 'General',
    terrains: ['Grassland', 'Forest', 'Urban'],
    themes: ['goblinoid', 'war'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/239/280/315/636252763146663668.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Yuan-ti Pit Master',
    cr: 7,
    role: 'General',
    terrains: ['Swamp', 'Forest'],
    themes: ['yuan-ti', 'cult', 'poison'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/30862/849/280/315/638070090466353951.png',
    source: 'Mordenkainen Presents: Monsters of the Multiverse'
  },
  {
    name: 'Stone Giant Dreamwalker',
    cr: 10,
    role: 'General',
    terrains: ['Mountain', 'Underdark'],
    themes: ['giant', 'dream', 'stone'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/30833/798/280/315/638063833352868512.png',
    source: 'Volo\'s Guide to Monsters'
  },
  {
    name: 'Gladiator',
    cr: 5,
    role: 'Knight',
    terrains: ['Urban', 'Grassland', 'Coastal'],
    themes: ['martial', 'arena'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/51/280/315/636252762726422473.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Hobgoblin Captain',
    cr: 3,
    role: 'Knight',
    terrains: ['Grassland', 'Forest', 'Urban'],
    themes: ['goblinoid', 'war'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/234/280/315/636252763138787984.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Veteran',
    cr: 3,
    role: 'Knight',
    terrains: ['Urban', 'Grassland', 'Mountain'],
    themes: ['martial', 'mercenary'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/310/280/315/636252763269837809.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Wight',
    cr: 3,
    role: 'Knight',
    terrains: ['Forest', 'Swamp', 'Urban'],
    themes: ['undead', 'necromancy'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/311/280/315/636252763271217675.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Yuan-ti Malison',
    cr: 3,
    role: 'Knight',
    terrains: ['Swamp', 'Forest', 'Underdark'],
    themes: ['yuan-ti', 'cult', 'poison'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/362/280/315/636252763403012402.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Cult Fanatic',
    cr: 2,
    role: 'Pawn',
    terrains: ['Urban', 'Forest', 'Underdark'],
    themes: ['cult', 'arcane'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/206/280/315/636252763038977249.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Bandit',
    cr: 0.125,
    role: 'Pawn',
    terrains: ['Grassland', 'Forest', 'Urban', 'Coastal'],
    themes: ['bandit', 'mercenary'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/15/280/315/636252762643897199.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Goblin',
    cr: 0.25,
    role: 'Pawn',
    terrains: ['Forest', 'Grassland', 'Underdark'],
    themes: ['goblinoid', 'war'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/226/280/315/636252763125668167.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Skeleton',
    cr: 0.25,
    role: 'Pawn',
    terrains: ['Urban', 'Underdark', 'Desert'],
    themes: ['undead', 'necromancy'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/292/280/315/636252763242240526.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Kobold',
    cr: 0.125,
    role: 'Pawn',
    terrains: ['Mountain', 'Underdark', 'Forest'],
    themes: ['dragon', 'goblinoid'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/254/280/315/636252763175224799.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Bullywug',
    cr: 0.25,
    role: 'Pawn',
    terrains: ['Swamp'],
    themes: ['swamp', 'tribal'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/182/280/315/636252762946602571.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Merrow',
    cr: 2,
    role: 'Pawn',
    terrains: ['Coastal', 'Swamp'],
    themes: ['aquatic', 'brutal'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/102/280/315/636252762807989089.jpeg',
    source: 'Monster Manual'
  },
  {
    name: 'Acolyte',
    cr: 0.25,
    role: 'Pawn',
    terrains: ['Urban', 'Grassland', 'Forest'],
    themes: ['cult', 'holy'],
    image: 'https://www.dndbeyond.com/avatars/thumbnails/0/3/280/315/636252762625643574.jpeg',
    source: 'Monster Manual'
  }
];

const DEFAULT_SELECTION: HordeSelection = {
  leader: 'Ancient Black Dragon',
  terrain: 'Swamp',
  generals: 2,
  knights: 4,
  pawns: 12
};

const numberFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3
});

const uniqueThemesForLeader = (leaderName: string) => {
  const leader = MONSTERS.find((monster) => monster.name === leaderName);
  return leader ? leader.themes : [];
};

const crDisplay = (cr: number) => {
  if (cr < 1) {
    return `1/${Math.round(1 / cr)}`;
  }
  return numberFormatter.format(cr);
};

const distributeMonsters = (
  role: MonsterRole,
  count: number,
  terrain: string,
  themes: string[]
) => {
  const basePool = MONSTERS.filter((monster) => monster.role === role);
  const themedPool = basePool.filter(
    (monster) =>
      monster.terrains.includes(terrain) &&
      themes.some((theme) => monster.themes.includes(theme))
  );
  const terrainPool = basePool.filter((monster) => monster.terrains.includes(terrain));
  const themePool = basePool.filter((monster) =>
    themes.some((theme) => monster.themes.includes(theme))
  );

  const pool = themedPool.length
    ? themedPool
    : terrainPool.length
      ? terrainPool
      : themePool.length
        ? themePool
        : basePool;

  return Array.from({ length: count }, (_, index) => pool[index % pool.length]);
};

const summarizeCR = (monsters: Monster[]) => {
  if (!monsters.length) {
    return '—';
  }
  const total = monsters.reduce((sum, monster) => sum + monster.cr, 0);
  return `Avg CR ${crDisplay(total / monsters.length)}`;
};

export default function Home() {
  const [selection, setSelection] = useState<HordeSelection>(DEFAULT_SELECTION);
  const [generatedGroups, setGeneratedGroups] = useState<HordeGroup[]>([]);

  const leaders = useMemo(() => MONSTERS.filter((monster) => monster.role === 'Leader'), []);

  const handleGenerate = () => {
    const themes = uniqueThemesForLeader(selection.leader);
    const leaderMonster = MONSTERS.find((monster) => monster.name === selection.leader);

    if (!leaderMonster) {
      return;
    }

    const groups: HordeGroup[] = [
      {
        title: 'Primary Enemy Leader',
        description: 'The core threat and tactical centerpiece of the encounter.',
        monsters: [leaderMonster]
      },
      {
        title: `Generals (${selection.generals})`,
        description: 'Strategic lieutenants who bolster the leader and control squads.',
        monsters: distributeMonsters('General', selection.generals, selection.terrain, themes)
      },
      {
        title: `Knights (${selection.knights})`,
        description: 'Elite combatants that protect objectives and press the attack.',
        monsters: distributeMonsters('Knight', selection.knights, selection.terrain, themes)
      },
      {
        title: `Pawns (${selection.pawns})`,
        description: 'Low-CR troops to fill the battlefield and apply pressure.',
        monsters: distributeMonsters('Pawn', selection.pawns, selection.terrain, themes)
      }
    ];

    setGeneratedGroups(groups);
  };

  const totalMonsters = generatedGroups.reduce(
    (sum, group) => sum + group.monsters.length,
    0
  );

  const thematicTags = useMemo(() => uniqueThemesForLeader(selection.leader), [selection.leader]);

  return (
    <main className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">Dungeon Master Toolkit</p>
          <h1>D&amp;D 5e Enemy Horde Generator</h1>
          <p className="subtitle">
            Assemble mechanically balanced, thematic enemy forces fast. Pick your leader, terrain,
            and unit counts to auto-build a full encounter roster with official D&amp;D 5e monsters
            and images.
          </p>
          <div className="tag-row">
            {thematicTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-card">
          <h2>Encounter Inputs</h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleGenerate();
            }}
            className="form"
          >
            <label>
              Primary Enemy Leader
              <select
                value={selection.leader}
                onChange={(event) =>
                  setSelection((current) => ({
                    ...current,
                    leader: event.target.value
                  }))
                }
              >
                {leaders.map((leader) => (
                  <option key={leader.name} value={leader.name}>
                    {leader.name} (CR {crDisplay(leader.cr)})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Terrain / Environment
              <select
                value={selection.terrain}
                onChange={(event) =>
                  setSelection((current) => ({
                    ...current,
                    terrain: event.target.value
                  }))
                }
              >
                {TERRAIN_OPTIONS.map((terrain) => (
                  <option key={terrain} value={terrain}>
                    {terrain}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid">
              <label>
                Generals
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={selection.generals}
                  onChange={(event) =>
                    setSelection((current) => ({
                      ...current,
                      generals: Math.max(1, Number(event.target.value))
                    }))
                  }
                />
              </label>
              <label>
                Knights
                <input
                  type="number"
                  min={1}
                  max={12}
                  value={selection.knights}
                  onChange={(event) =>
                    setSelection((current) => ({
                      ...current,
                      knights: Math.max(1, Number(event.target.value))
                    }))
                  }
                />
              </label>
              <label>
                Pawns
                <input
                  type="number"
                  min={4}
                  max={40}
                  value={selection.pawns}
                  onChange={(event) =>
                    setSelection((current) => ({
                      ...current,
                      pawns: Math.max(4, Number(event.target.value))
                    }))
                  }
                />
              </label>
            </div>

            <button type="submit">Generate Horde</button>
          </form>
          <div className="note">
            <strong>Balance focus:</strong> CR tiers are mapped to roles (Leader &gt; General &gt; Knight
            &gt; Pawn) and filtered by terrain + theme for cohesive encounters.
          </div>
        </div>
      </header>

      <section className="output">
        <div className="output-header">
          <div>
            <h2>Generated Enemy List</h2>
            <p>
              {generatedGroups.length
                ? `Total monsters: ${totalMonsters}`
                : 'Use the form above to create your horde.'}
            </p>
          </div>
          {generatedGroups.length ? (
            <div className="summary">
              {generatedGroups.map((group) => (
                <div key={group.title}>
                  <span>{group.title}</span>
                  <strong>{summarizeCR(group.monsters)}</strong>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div className="group-list">
          {generatedGroups.map((group) => (
            <article key={group.title} className="group">
              <header>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
              </header>
              <div className="monster-grid">
                {group.monsters.map((monster, index) => (
                  <div key={`${monster.name}-${index}`} className="monster-card">
                    <img src={monster.image} alt={monster.name} />
                    <div>
                      <h4>{monster.name}</h4>
                      <p>
                        CR {crDisplay(monster.cr)} • {monster.source}
                      </p>
                      <div className="tag-row">
                        {monster.terrains.map((terrain) => (
                          <span key={`${monster.name}-${terrain}`} className="tag ghost">
                            {terrain}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div>
          <h3>Encounter Prep Notes</h3>
          <ul>
            <li>
              Leaders are designed to anchor the fight. Generals and knights provide battlefield
              tactics and elite pressure.
            </li>
            <li>
              Pawn totals are tuned for action economy; reduce by 25% for lower-level parties or
              tighten terrain constraints for a more focused theme.
            </li>
            <li>
              Pair this roster with lair actions, environmental hazards, and clear objectives to make
              the battle memorable.
            </li>
          </ul>
        </div>
      </footer>
    </main>
  );
}
