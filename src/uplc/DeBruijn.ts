import { NamedDeBruijn, Term, TermType } from './term';

const fromDeBruijnTerm = (term: Term): Term => {
  let idx = 0;
  const go = (term: Term, env: Array<string>): Term => {
    switch (term.type) {
      case TermType.Var: {
        const binderName = env[term.name!.index - 1];
        const name = new NamedDeBruijn(binderName, term.name?.index);
        return Term.Var(name);
      }
      case TermType.LamAbs: {
        const binderName: string = `i_${idx}`;
        idx += 1;
        return Term.LamAbs(binderName, go(term.term!, [binderName, ...env]));
      }
      case TermType.Apply: {
        const { f, arg } = term;
        return Term.Apply(go(f!, env), go(arg!, env));
      }
      case TermType.Force: {
        return Term.Force(go(term.term!, env));
      }
      case TermType.Delay: {
        return Term.Delay(go(term.term!, env));
      }
      case TermType.Const: {
        return term;
      }
      case TermType.Builtin: {
        return term;
      }
      case TermType.Error: {
        return term;
      }
      default:
        throw new Error('not found term type');
    }
  };
  return go(term, []);
};

export const DeBruijn = {
  fromDeBruijnTerm,
};
