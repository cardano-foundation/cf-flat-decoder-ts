import { Constant } from "./Constant";

export class NamedDeBruijn {
  name: string;
  index: number;

  constructor(name: string, index: number = 0) {
    if (index < 0) {
      throw new Error("Index must be non-negative.");
    }

    this.name = name;
    this.index = index;
  }

  toString(): string {
    if (this.index === 0) {
      return `NamedDeBruijn("${this.name}")`;
    } else {
      return `NamedDeBruijn("${this.name}", ${this.index})`;
    }
  }
}

export enum TermType {
  Var,
  LamAbs,
  Apply,
  Force,
  Delay,
  Const,
  Builtin,
  Error,
}

// Định nghĩa lớp Term với các trường tương ứng với enum Term
export class Term {
  type?: TermType;
  name?: NamedDeBruijn;
  term?: Term;
  f?: Term;
  arg?: Term;
  const?: Constant;
  bn?: string;

  static Var(name: NamedDeBruijn): Term {
    const vars = new Term();
    vars.type = TermType.Var;
    vars.name = name;
    return vars;
  }

  static LamAbs(name: string, term: Term): Term {
    const lamAbsTerm = new Term();
    lamAbsTerm.type = TermType.LamAbs;
    lamAbsTerm.name = new NamedDeBruijn(name);
    lamAbsTerm.term = term;
    return lamAbsTerm;
  }

  static Apply(f: Term, arg: Term): Term {
    const applyTerm = new Term();
    applyTerm.type = TermType.Apply;
    applyTerm.f = f;
    applyTerm.arg = arg;
    return applyTerm;
  }

  static Force(term: Term): Term {
    const forceTerm = new Term();
    forceTerm.type = TermType.Force;
    forceTerm.term = term;
    return forceTerm;
  }

  static Delay(term: Term): Term {
    const delayTerm = new Term();
    delayTerm.type = TermType.Delay;
    delayTerm.term = term;
    return delayTerm;
  }

  static Const(constant: Constant): Term {
    const constTerm = new Term();
    constTerm.type = TermType.Const;
    constTerm.const = constant;
    return constTerm;
  }

  static Builtin(defaultFun: string): Term {
    const builtinTerm = new Term();
    builtinTerm.type = TermType.Builtin;
    builtinTerm.bn = defaultFun;
    return builtinTerm;
  }

  static Error(): Term {
    const errorTerm = new Term();
    errorTerm.type = TermType.Error;
    return errorTerm;
  }

  public static indent = 5;
  public static readonly INCREA_INDENT = 3;

  public pretty(): string | undefined {
    switch (this.type) {
      case TermType.Var: {
        const name = this.name ? this.name.name : "";
        return name;
      }
      case TermType.LamAbs: {
        return `(lam ${
          this.name?.name
        }<br/><span style='margin-left:${(Term.indent +=
          Term.INCREA_INDENT)}px'>${this.term?.pretty()}</span>)`;
      }
      case TermType.Apply: {
        return `[${this.f?.pretty()} ${this.arg?.pretty()}]`;
      }
      case TermType.Force: {
        return `(force ${this.term?.pretty()})`;
      }
      case TermType.Delay: {
        return `(delay ${this.term?.pretty()})`;
      }
      case TermType.Const: {
        return `(con ${this.const?.pretty()})`;
      }
      case TermType.Builtin: {
        return `(builtin ${this.bn})`;
      }
      case TermType.Error: {
        return `(error)`;
      }
    }
  }
}

export type Version = {
  major: number;
  minor: number;
  patch: number;
};

export class DeBruijnedProgram {
  version: Version;
  term: Term;

  constructor(version: Version, term: Term) {
    this.version = version;
    this.term = term;
  }

  public pretty() {
    const { major, minor, patch } = this.version;
    return `(program ${major}.${minor}.${patch} ${this.term.pretty()})`;
  }
}
